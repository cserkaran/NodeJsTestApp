var async = require('async');
var assert = require('assert');

var ReviewProcess = function(args) {

    assert(args.application, "Need an application");

    var app = args.application;

    //make sure the app is valid
    this.ensureAppValid = function(next) {
        if (app.isValid()) {
            next(null, true);
        } else {
            next(app.validationMessage(), null);
        }
    };

    // find the next mission
    this.findNextMission = function(next) {
        //stub this out for now
        var mission = {
            commander: null,
            pilot: null,
            MAVPilot: null,
            passengers: []
        };
        next(null, mission);
    };

    // make sure the role selected is available
    this.roleIsAvailable = function(next) {
        // we have no concept of role selection just yet
        // TO DO : What about a role ? Need more info
        next(null, true);
    };

    // make rule height/weight/age is right for the role
    this.ensureRoleCompatible = function(next) {
        // TO DO : find out roles and weight/height
        next(null, true);
    };

    this.approveApplication = function(next) {
        next(null, true);
    };

    this.processApplication = function(next) {
        async.series({
                validated: this.ensureAppValid,
                mission: this.findNextMission,
                roleAvailable: this.roleIsAvailable,
                roleCompatible: this.ensureRoleCompatible,
                success: this.approveApplication
            },
            function(err, result) {
                if (err) {
                    next(null, {
                        success: false,
                        message: err
                    });
                } else {
                    result.message = "Welcome to Mars!";
                    next(null, result);
                }
            });
    };
};

module.exports = ReviewProcess;