function StageAssistant() {
	/* this is the creator function for your stage assistant object */
}

StageAssistant.prototype.setup = function() {
	/* this function is for setup tasks that have to happen when the stage is first created */
    this.controller.pushScene("main");
};

/**
 * This is deliberately not in the prototype, since it just exists to make creating menus easier.
 */
StageAssistant.setupMenu = function(sceneController) {
    sceneController.setupWidget(
        Mojo.Menu.appMenu,
        { omitDefaultItems: true },
        {
            items: [
               { label: 'About', command: 'about' }
            ]
        }
    );
};

StageAssistant.prototype.handleCommand = function(event) {
    this.controller=Mojo.Controller.stageController.activeScene();
    if(event.type == Mojo.Event.command) {
        switch(event.command) {
            case 'about':
                this.controller.showAlertDialog({
                    onChoose: function(value) {},
                    title: "BART Arrival",
                    message: 'Simple application to display estimated arrival times for BART trains.<br />For help or feedback, please contact Bem Jones-Bey at <a href="mailto:bem@jones-bey.org">bem@jones-bey.org</a> or on Twitter at <a href="http://twitter.com/bemjb">http://twitter.com/bemjb</a>',
                    allowHTMLMessage: true,
                    choices:[
                        {label:"OK", value:""}
                    ]
                });
                break;
        }
    }
}; 
