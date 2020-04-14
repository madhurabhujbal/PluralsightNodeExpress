const passport = require('passport');

module.exports = function passportConfig(app) {
    app.use(passport.initialize());
    app.use(passport.session());

    // Store user in function
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    // Retrieve user from session
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
};