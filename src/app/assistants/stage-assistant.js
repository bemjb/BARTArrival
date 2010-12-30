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
                    message: '<p>Copyright 2010, <a href="http://bem.jones-bey.org/">Bem Jones-Bey</a><br/>Reload icon by Matt Ball</p></div>',
                    allowHTMLMessage: true,
                    choices:[
                        {label:"OK", value:""}
                    ]
                });
                break;
        }
    }
}; 
