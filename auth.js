const express = require('express');
const {MongoClient} = require('mongodb');
const debug = require('debug')('app:auth');

const authRouter = express.Router();

authRouter.route('/signUp')
.post((req, res) => {
    debug(req.body);
    req.login(req.body,() => {
        res.redirect('/auth/profile');
    });
});

authRouter.route('/profile')
.get((req, res) => {
    res.json(req.user);
});
module.exports = authRouter;