const express = require('express');

function router(nav) {
    const bookRouter = express.Router();
    const {getIndex, getId, middleware} = require('./controller/booksController')(nav);

    bookRouter.use(middleware);

    bookRouter.route('/')
    .get(getIndex);

    bookRouter.route('/:id')
    .get(getId);
    return bookRouter;
};

module.exports = router;