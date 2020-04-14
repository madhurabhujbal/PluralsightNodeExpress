const express = require('express');
const {MongoClient} = require('mongodb');
const debug = require('debug')('app:auth');
const passport = require('passport');

function router(nav) {
    const authRouter = express.Router();
    authRouter.route('/signUp')
    .post((req, res) => {
        debug(req.body);

        // Create user

        //1. Establish connection to mongodb
        const url = 'mongodb://localhost:27017';
        const dbName = 'LibraryApp';
        const { username, password } = req.body;
        (async function addUser() {
            let conn;
            try {
                // Establish connection
                conn = await MongoClient.connect(url);
                const db = conn.db(dbName);
                const userCollection = db.collection('users');
                const user = {username, password};
                const result = await userCollection.insertOne(user);
                debug(result.ops[0]);
                req.login(result.ops[0], () => {
                    res.redirect('/auth/profile');
                });
            } catch (error) {
                debug(error.stack);
            }
            // Close connection
            conn.close();
        }());
    });

    authRouter.route('/signin')
    .get((req, res) => {
        res.render('signin', {name : 'Sign In', nav});
    })
    .post(passport.authenticate('local', {
        successRedirect: '/auth/profile',
        failureRedirect: '/'
    }));

    authRouter.route('/profile')
    .all((req, res, next) => {
        if (req.user) {
            next();
        } else {
            res.redirect('/');
        }
    })
    .get((req, res) => {
        res.json(req.user);
    });
    return authRouter;
}
module.exports = router;