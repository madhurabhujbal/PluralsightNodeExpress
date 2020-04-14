const passport = require('passport');
const { Strategy } = require('passport-local');
const {MongoClient} = require('mongodb');
const debug = require('debug')('app:local.strategy');

module.exports = function localStrategy() {
    passport.use(new Strategy(
        {
            usernameField: 'username',
            passwordField: 'password'
        },
        (username, password, done) => {
            const url = 'mongodb://localhost:27017';
            const dbName = 'LibraryApp';
            (async function getUser(){
                let conn;
                try {
                    // Establish connection
                    conn = await MongoClient.connect(url);
                    const db = conn.db(dbName);
                    const userCollection = db.collection('users');
                    const user = await userCollection.findOne({username});

                    if(user != null && user.password === password) {
                        done(null, user);
                    } else {
                        done(null, false);
                    }
                } catch (error) {
                    debug(error.stack);
                }
                // Close connection
                conn.close();
            }());
        }
    ));
}