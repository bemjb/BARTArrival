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
    
    this.currentStation = 'CLOSEST';

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
    this.stationModel = { "value": this.currentStation, "disabled": false, "choices": choices };
}

MainAssistant.prototype.setup = function() {
    /* this function is for setup tasks that have to happen when the scene is first created */
        
    /* use Mojo.View.render to render view templates and add them to the scene, if needed */
    
    /* setup widgets here */
    this.controller.setupWidget("stations", { "label": "Station" }, this.stationModel);

    /* add event handlers to listen to events from widgets */
    Mojo.Event.listen(this.controller.get("stations"), Mojo.Event.propertyChange, this.stationChange.bind(this));

    this.locateClosestStation();
};

MainAssistant.prototype.locateClosestStation = function() {
    // attempt to get a location fix
    Mojo.Log.info("Making request for current location");
    this.controller.serviceRequest('palm://com.palm.location', {
        method:"getCurrentPosition",
        parameters: {
            accuracy: 2,
            maximumAge: 30,
            responseTime: 2
        },
        onSuccess: this.gotLocation.bind(this),
        onFailure: this.failedLocation.bind(this)
    });
};

MainAssistant.prototype.stationChange = function(event) {
    var stationAbbr = this.stationModel.value;
    if (stationAbbr == 'CLOSEST') {
        this.infoMessage("Acquiring current location to determine the closest station. If you do not wish to wait, you can select a station manually.");
        this.locateClosestStation();
    }
    else {
        var req = new Ajax.Request(
            "http://api.bart.gov/api/etd.aspx?cmd=etd&orig=" + stationAbbr + "&key=MW9S-E7SL-26DU-VV8V",
            {
                method: "get",
                evalJSON: false,
                onSuccess: this.updateEtaDisplay.bind(this),
                onFailure: this.failedToGetEta.bind(this)
            }
        );
    }
};

MainAssistant.prototype.updateEtaDisplay = function(response) {
    this.currentStation = this.stationModel.value;

    var generatedHTML = '';
    var json = XML2JSON.convert(response.responseXML);
    json.root[0].station[0].etd.forEach(function(etd) {
        generatedHTML += "<p><b>" + etd.destination[0] + "</b><ul>";
        etd.estimate.forEach(function(estimate) {
            generatedHTML += "<li> In " + estimate.minutes[0] + " minutes, " +
                estimate.length[0] + " car train</li>";
        });
        generatedHTML += "</ul></p>";
    });
    this.controller.get("stationInfo").innerHTML = generatedHTML;
};

MainAssistant.prototype.failedToGetEta = function(response) {
    this.infoMessage(
        "<p>" + response.status + " " + response.statusText.escapeHTML() + "</p>" +
        "<p>" + response.responseText.escapeHTML + "</p>"
    );
};

MainAssistant.prototype.gotLocation = function(result) {
    if (this.currentStation == 'CLOSEST') {
        var latLon = new LatLon(result.latitude, result.longitude);
        var station = this.findClosestStation(latLon);
        Mojo.Log.info("The closest station to %s is %j", latLon.toString('d'), station);
        this.currentStation = station.info.abbr;
        this.stationModel.value = station.info.abbr;
        this.controller.modelChanged(this.stationModel);
        this.stationChange();
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
    if (this.currentStation == 'CLOSEST') {
        if (result.errorCode != 7) {
            this.infoMessage("Failed to get location: " + this.locationErrorMessages[result.errorCode]);
        }
        // error code 7 is when this application already has a message. It
        // shouldn't ever happen with this application, but if so, we'll ignore
        // this failure and let the previous message go through.
    }
    // if the current station is set to something other than CLOSEST,
    // then the user has chosen a station manually, and doesn't care if this
    // failed.
};

MainAssistant.prototype.infoMessage = function(message) {
    this.controller.get("stationInfo").innerHTML = message;
};

MainAssistant.prototype.activate = function(event) {
    /* put in event handlers here that should only be in effect when this scene is active. For
       example, key handlers that are observing the document */

    // Make sure the displayed data is up to date.
    this.stationChange();
};

MainAssistant.prototype.deactivate = function(event) {
    /* remove any event handlers you added in activate and do any other cleanup that should happen before
       this scene is popped or another scene is pushed on top */
};

MainAssistant.prototype.cleanup = function(event) {
    /* this function should do any cleanup needed before the scene is destroyed as 
       a result of being popped off the scene stack */
};
