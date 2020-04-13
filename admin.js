const express = require('express');

const adminRouter = express.Router();

adminRouter.route('/').
get((req, res) => {
    res.send('Inserting the data');
});
module.exports = adminRouter;