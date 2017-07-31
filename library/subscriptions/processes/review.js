var Emitter = require('events').EventEmitter;
var util = require('util');

var ReviewProcess = function(args) {
    var callback;
    //make sure the app is valid
    this.ensureAppValid = function(app) {
        if (app.isValid()) {
            this.emit("validated", app);
        } else {
            this.emit("invalid", app.validationMessage());
        }
    };

    // find the next mission
    this.findNextMission = function(app) {
        //stub this out for now
        app.mission = {
            commander: null,
            pilot: null,
            MAVPilot: null,
            passengers: []
        };
        this.emit("mission-selected", app);
    };

    // make sure the role selected is available
    this.roleIsAvailable = function(app) {
        // we have no concept of role selection just yet
        // TO DO : What about a role ? Need more info
        this.emit("role-available", app);
    };

    // make rule height/weight/age is right for the role
    this.ensureRoleCompatible = function(app) {
        // TO DO : find out roles and weight/height
        this.emit("role-compatible", app);
    };

    //accept the app with a message
    this.acceptApplication = function(app) {
        // What do we do ? 
        callback(null, {
            success: true,
            message: 'Welcome to Mars Program!'
        });
    };

    //deny the app with a message
    this.denyApplication = function(message) {
        // What do we do ? 
        callback(null, {
            success: false,
            message: message
        });
    };

    this.processApplication = function(app, next) {
        callback = next;
        this.emit("application-recieved", app);
    };

    //event path
    this.on("application-recieved", this.ensureAppValid);
    this.on("validated", this.findNextMission);
    this.on("mission-selected", this.roleIsAvailable);
    this.on("role-available", this.ensureRoleCompatible);
    this.on("role-compatible", this.acceptApplication);

    //sad path
    this.on("invalid", this.denyApplication);
};

util.inherits(ReviewProcess, Emitter);
module.exports = ReviewProcess;