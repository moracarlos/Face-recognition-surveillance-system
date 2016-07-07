// passport/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;
var BasicStrategy = require('passport-http').BasicStrategy;
// load up the user model
var User = require('../models/user');
// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy(
        {
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true
        },
        function(req, email, password, done) {
        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {

            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            User.findOne({ 'email' :  email }, function(err, user) {
                console.log(err)
                // if there are any errors, return the error
                if (err)
                    return done(err);

                // check to see if theres already a user with that email
                if (user) {
                    return done(null, false, { message: req.flash('signupMessage', 'Already used') });
                } else {
                    // if there is no user with that email
                    // create the user
                    var newUser            = new User();

                    // set the user's local credentials
                    newUser.email    = email;
                    newUser.password = newUser.generateHash(password);
                    newUser.firstName = req.param('firstName');
                    newUser.lastName = req.param('lastName');
                    newUser.school = req.param('school');
                    newUser.role = req.param('role');
                    // save the user
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }

            });    

        });

    }));

    //Log in -----------------------------------------------------------------------------------------
    passport.use('local-login', new LocalStrategy(
        {
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true
        },
        function(req, email, password, done){
        User.findOne({email:email}, function(err, user){
            if (err) {return done(err);}
            if (!user){
                return done(null, false, req.flash('loginMessage', 'The username and password you entered did not match our records'));
            }
            if (!user.validPassword(password)){
                return done(null, false, req.flash('loginMessage', 'The username and password you entered did not match our records'));
            }
            return done(null, user);
        });
    }));

    //Basic API -----------------------------------------------------------------------------------------------
    passport.use('basic', new BasicStrategy(function(email, password, done) {
            User.findOne({ email: email }, function (err, user) {
                if (err) { return done(err); }
                if (!user) { 
                    return done(null, false); 
                }
                if (!user.validPassword(password)) { 
                    return done(null, false); 
                }
                return done(null, user);
            });
        }));

    //Admin API ----------------------------------------------------------------------------------------------
    passport.use('basic-admin', new BasicStrategy(function(email, password, done) {
            User.findOne({ email: email, role:'admin' }, function (err, user) {
                if (err) { return done(err); }
                if (!user) { 
                    return done(null, false); 
                }
                if (!user.validPassword(password)) { 
                    return done(null, false); 
                }
                return done(null, user);
            });
        }));
};