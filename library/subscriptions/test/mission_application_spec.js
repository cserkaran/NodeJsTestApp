var assert = require('assert');
var MembershipApplication = require('../models/membership_application');

describe("Memebership application requirements", function() {
    var validApp;
    before(function() {
        validApp = new MembershipApplication({
            first: "Test",
            last: "User",
            email: "test@test.com",
            age: 30,
            height: 66,
            weight: 180
        });
    });

    describe("Application valid if...", function() {
        it("all validators successful", function() {
            assert(validApp.isValid(), "Not valid");
        });
        it("email is 4 or more chars and contains and @", function() {
            assert(validApp.emailIsValid(), "Not valid");
        });
        it("height is between 60 and 75 inches", function() {
            assert(validApp.heightIsValid(), "Not valid");
        });
        it("age is between 15 and 100", function() {
            assert(validApp.ageIsValid(), "Not valid");
        });
        it("weight is between 100 and 300", function() {
            assert(validApp.weightIsValid(), "Not valid");
        });
        it("first and last name are provided", function() {
            assert(validApp.nameIsValid(), "Not valid");
        });
    });

    describe("Application invalid if...", function() {

        it("is past the validUntil date", function() {
            var app = new MembershipApplication({
                validUntil: Date.parse("01/01/2010")
            });
            assert(app.expired());
        });

        it("email is 4 characters or less", function() {
            var app = new MembershipApplication({
                email: "d@d"
            });
            assert(!app.emailIsValid());
        });

        it("email does not contain an @", function() {
            var app = new MembershipApplication({
                email: "thingthing"
            });
            assert(!app.emailIsValid());
        });

        it("email is omitted", function() {
            var app = new MembershipApplication({});
            assert(!app.emailIsValid());
        });

        it("height is less than 60 inches", function() {
            var app = new MembershipApplication({
                height: 10
            });
            assert(!app.heightIsValid());
        });

        it("height is more than 75 inches", function() {
            var app = new MembershipApplication({
                height: 80
            });
            assert(!app.heightIsValid());
        });

        it("height is omitted", function() {
            var app = new MembershipApplication({});
            assert(!app.heightIsValid());
        });

        it("age is more than 100", function() {
            var app = new MembershipApplication({ age: 101 });
            assert(!app.ageIsValid());
        });

        it("age is less than 100", function() {
            var app = new MembershipApplication({ age: 14 });
            assert(!app.ageIsValid());
        });

        it("age is omitted", function() {
            var app = new MembershipApplication();
            assert(!app.ageIsValid());
        });

        it("weight is less than 100", function() {
            var app = new MembershipApplication({ weight: 99 });
            assert(!app.weightIsValid());
        });

        it("weight is more than 300", function() {
            var app = new MembershipApplication({ weight: 301 });
            assert(!app.weightIsValid());
        });

        it("weight is omitted", function() {
            var app = new MembershipApplication();
            assert(!app.weightIsValid());
        });

        it("first is omitted", function() {
            var app = new MembershipApplication();
            assert(!app.nameIsValid());
        });

        it("last is omitted", function() {
            var app = new MembershipApplication();
            assert(!app.nameIsValid());
        });
    });
});