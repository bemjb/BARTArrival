function MainAssistant() {
    /* this is the creator function for your scene assistant object. It will be passed all the 
       additional parameters (after the scene name) that were passed to pushScene. The reference
       to the scene controller (this.controller) has not be established yet, so any initialization
       that needs the scene controller should be done in the setup function below. */

    this.locationErrorMessages = [
        // 0: Success
        "This is a bug! Got success code in failure handler!",
        // 1: Timeout
        "Request timed out.",
        // 2: Position_Unavailable
        "Your position is currently unavailable.",
        // 3: Unknown
        "Unknown error!",
        // 4: Unknown, not documented!
        "Unknown, undocumented error!",
        // 5: LocationServiceOFF - No Location source available. Both Google and GPS are off.
        "Location Services are off. To use this service, you must enable the Location service using the Location Services Preferences in the Launcher.",
        // 6: Permission Denied - The user has not accepted the terms of use
        // for the Google Location Service, or the Google Service is off.
        "Permission Denied. To use this service, you must enable the Location service using the Location Services Preferences in the Launcher.",
        // 7: The application already has a pending message
        "This is a bug! The application is confused.",
        // 8: The application has been temporarily blacklisted.
        "This application has been blacklisted."
    ];

    this.refreshInterval = 60; // refresh every minute

    // Set up station model
    var choices = [];
    for (var abbr in StationGeoLoc) {
        choices.push({ "label": StationGeoLoc[abbr].name, "value": abbr });
    }
    choices.sort(function(a,b) {
        // Sort by label so that the list is in a nice order for the user
        if (a.label == b.label) return 0;
        else if (a.label > b.label) return 1;
        else /* a.label < b.label */ return -1;
    });
    choices.unshift({ label: "Closest station", "value": "CLOSEST" });
    this.stationModel = { value: 'CLOSEST', disabled: false, choices: choices };

    this.stationInfoModel = {
        items: [ {
            dest: '',
            info: "Acquiring current location to determine the closest station. If you do not wish to wait, you can select a station manually."
        } ]
    };
}

MainAssistant.prototype.setup = function() {
    /* this function is for setup tasks that have to happen when the scene is first created */
        
    /* use Mojo.View.render to render view templates and add them to the scene, if needed */
    
    /* setup widgets here */
    StageAssistant.setupMenu(this.controller);

    this.controller.setupWidget("stations", { label: "" }, this.stationModel);
    this.timestampElement = this.controller.get("timestamp");

    this.controller.setupWidget("stationInfoScroller", { mode: "vertical" }, { });

    this.controller.setupWidget(
        "stationInfo",
        {
            fixedHeightItems: false,
            listTemplate: "main/station-info-list-template",
            itemTemplate: "main/station-info-item-template",
            hasNoWidgets: true
        },
        this.stationInfoModel
    );
    this.stationInfoElement = this.controller.get("stationInfo");

    this.controller.setupWidget(
        "progressSpinner",
        { spinnerSize: "large" },
        { spinning: true }
    );
    this.spinnerElement = this.controller.get("progressSpinner");

    /* add event handlers to listen to events from widgets */
    Mojo.Event.listen(
        this.controller.get("stations"),
        Mojo.Event.propertyChange,
        this.handleNewStationEvent.bind(this)
    );
};

MainAssistant.prototype.locateClosestStation = function() {
    // attempt to get a location fix
    Mojo.Log.info("Making request for current location");
    this.controller.serviceRequest('palm://com.palm.location', {
        method:"getCurrentPosition",
        parameters: {
            accuracy: 2,
            maximumAge: 5,
            responseTime: 2
        },
        onSuccess: this.gotLocation.bind(this),
        onFailure: this.failedLocation.bind(this)
    });
};

MainAssistant.prototype.handleNewStationEvent = function(event) {
    this.disableRefresh();
    if (this.stationModel.value == 'CLOSEST') {
        this.infoMessage("", "Acquiring current location to determine the closest station. If you do not wish to wait, you can select a station manually.");
        this.locateClosestStation();
    }
    else {
        this.loadTrainInfo(true);
    }
};

MainAssistant.prototype.handleDeactivateEvent = function(event) {
    this.disableRefresh();
};

MainAssistant.prototype.loadTrainInfo = function(newStation) {
    // just to be paranoid about it, make sure we don't refresh while refreshing
    this.disableRefresh();
    var stationAbbr = this.stationModel.value;
    Mojo.Log.info("Getting train info for station %s", stationAbbr);
    if (newStation) {
        this.clearTimestamp();
        this.startSpinner();
        this.infoMessage("", "Getting train information for " + StationGeoLoc[this.stationModel.value].name);
    }
    var req = new Ajax.Request(
        "http://api.bart.gov/api/etd.aspx?cmd=etd&orig=" + stationAbbr + "&key=EUS2-IHHG-U4GU-YBSI",
        {
            method: "get",
            evalJSON: false,
            onSuccess: this.updateEtaDisplay.bind(this),
            onFailure: this.failedToGetEta.bind(this)
        }
    );
};

MainAssistant.prototype.updateEtaDisplay = function(response) {
    var json = XML2JSON.convert(response.responseXML);

    this.updateTimestamp(json.root[0].time[0], json.root[0].date[0]);

    if (json.root[0].station && json.root[0].station[0].etd) {
        var etds = json.root[0].station[0].etd;
        // sort by direction so that trains are grouped nicely in the display.
        etds.sort(function(a,b) {
            // why direction is part of the estimate, I'll never know. You'd figure
            // that if a train is going to a given destination, the direction will
            // always be the same.
            var aDir = a.estimate[0].direction[0];
            var bDir = b.estimate[0].direction[0];
            if (aDir == bDir) return 0;
            else if (aDir > bDir) return 1;
            else /* aDir < bDir */ return -1;
        });
        // actually build display
        var listItems = etds.map(function(etd) {
            var item = { };
            item.dest = etd.destination[0];
            item.info = "<ul>";
            etd.estimate.forEach(function(estimate) {
                item.info += "<li>" + estimate.minutes[0].escapeHTML() +
                    (estimate.minutes[0] == "Arrived"?", ":" mins, ") +
                    + estimate.length[0].escapeHTML() + " cars, platform " +
                    estimate.platform[0].escapeHTML() + "</li>";
            });
            item.info += "</ul>";
            return item;
        });
        this.stationInfoModel.items = listItems;
        this.stationInfoModelChanged();
    }
    else {
        // we don't have a valid etd, so look for a message or something
        var message = "Unknown Error";
        if (json.root[0].message && json.root[0].message[0].warning) {
            message = json.root[0].message[0].warning[0];
        }
        this.infoMessage("There are no trains for this station", message);
    }
    this.stopSpinner();
    this.enableRefresh();
};

MainAssistant.prototype.failedToGetEta = function(response) {
    this.infoMessage("Error!",
        "<p>" + response.status + " " + response.statusText.escapeHTML() + "</p>" +
        "<p>" + response.responseText.escapeHTML + "</p>"
    );
    this.stopSpinner();
    this.enableRefresh();
};

MainAssistant.prototype.gotLocation = function(result) {
    if (this.stationModel.value == 'CLOSEST') {
        var latLon = new LatLon(result.latitude, result.longitude);
        var station = this.findClosestStation(latLon);
        Mojo.Log.info("The closest station to %s is %j", latLon.toString('d'), station);
        this.stationModel.value = station.info.abbr;
        this.controller.modelChanged(this.stationModel);
        this.loadTrainInfo(true);
    }
    // if the current station is set to something other than CLOSEST,
    // then the user has chosen a station manually, and doesn't want us to
    // override that.
};

MainAssistant.prototype.findClosestStation = function(currentLoc) {
    var closest = { distance: 6371 /* km around the globe */, info: undefined };
    for (var abbr in StationGeoLoc) {
        var stationInfo = StationGeoLoc[abbr];
        var distance = currentLoc.distanceTo(stationInfo.latLon);
        Mojo.Log.info("Station %s is %s km away", abbr, distance);
        if (distance < closest.distance) {
            closest.distance = distance;
            closest.info = stationInfo;
        }
    }
    return closest;
};

MainAssistant.prototype.failedLocation = function(result) {
    if (this.stationModel.value == 'CLOSEST') {
        if (result.errorCode != 7) {
            this.infoMessage(
                "Error!",
                "Failed to get location: " + this.locationErrorMessages[result.errorCode]
            );
        }
        // error code 7 is when this application already has a message. It
        // shouldn't ever happen with this application, but if so, we'll ignore
        // this failure and let the previous message go through.
        this.stopSpinner();
    }
    // if the current station is set to something other than CLOSEST,
    // then the user has chosen a station manually, and doesn't care if this
    // failed.
};

MainAssistant.prototype.infoMessage = function(title, message) {
    this.stationInfoModel.items = [
        { dest: title, info: message }
    ];
    this.stationInfoModelChanged();
};

MainAssistant.prototype.stationInfoModelChanged = function() {
    this.controller.modelChanged(this.stationInfoModel);
    this.stationInfoElement.mojo.noticeUpdatedItems(0, this.stationInfoModel.items);
    this.stationInfoElement.mojo.setLength(this.stationInfoModel.items.length);
};

MainAssistant.prototype.startSpinner = function() {
    this.spinnerElement.mojo.start();
    this.spinnerElement.style.display = 'block';
};

MainAssistant.prototype.stopSpinner = function() {
    this.spinnerElement.mojo.stop();
    this.spinnerElement.style.display = 'none';
};

MainAssistant.prototype.updateTimestamp = function(time, date) {
    // FIXME this should take the time and date and convert them to use the
    // locale settings of the user.
    this.timestampElement.innerHTML = 'Last updated at ' + time + ' on ' + date;
};

MainAssistant.prototype.clearTimestamp = function() {
    this.timestampElement.innerHTML = '&nbsp;';
};

MainAssistant.prototype.enableRefresh = function() {
    if (!this.refreshEnabled) {
        Mojo.Log.info("Scheduling refresh for %d seconds from now", this.refreshInterval);
        this.refreshEnabled = this.loadTrainInfo.bind(this).delay(this.refreshInterval, false);
    }
};

MainAssistant.prototype.disableRefresh = function() {
    if (this.refreshEnabled) {
        Mojo.Log.info("Disabling automatic refresh");
        clearTimeout(this.refreshEnabled);
        this.refreshEnabled = undefined;
    }
};

MainAssistant.prototype.activate = function(event) {
    /* put in event handlers here that should only be in effect when this scene is active. For
       example, key handlers that are observing the document */
    this.handleNewStationEvent();
};

MainAssistant.prototype.deactivate = function(event) {
    /* remove any event handlers you added in activate and do any other cleanup that should happen before
       this scene is popped or another scene is pushed on top */
};

MainAssistant.prototype.cleanup = function(event) {
    /* this function should do any cleanup needed before the scene is destroyed as 
       a result of being popped off the scene stack */
    Mojo.Event.stopListening(
        this.controller.get("stations"),
        Mojo.Event.propertyChange,
        this.handleNewStationEvent.bind(this)
    );
};
