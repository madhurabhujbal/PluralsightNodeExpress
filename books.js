const express = require('express');

function router(nav) {
    const bookRouter = express.Router();

    const books = [{title: 'A book of simple living' , author: 'Ruskin Bond'}, {title: 'Chaavaa', author: 'Shivaji Sawant'}, {title: 'Batatyachi chaal', author: 'P. L. Deshpande'}];

    bookRouter.route('/')
    .get((req, res) => {
        res.render('bookListView', {name: 'Books', nav, books});
    });

    bookRouter.route('/:id')
    .get((req, res) => {
        const id = req.params.id;
        res.render('bookView', {name: 'Books', nav, book: books[id]});
    });
    return bookRouter;
};

module.exports = router;