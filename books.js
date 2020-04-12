const express = require('express');

const bookRouter = express.Router();

const books = [{title: 'A book of simple living' , author: 'Ruskin Bond'}, {title: 'Chaavaa', author: 'Shivaji Sawant'}, {title: 'Batatyachi chaal', author: 'P. L. Deshpande'}];

bookRouter.route('/')
.get((req, res) => {
    res.render('bookListView', {name: 'Books', nav: [{title: 'Books', link: '/books'}, {title: 'Authors', link: '/authors'}], books});
});

bookRouter.route('/:id')
.get((req, res) => {
    const id = req.params.id;
    res.render('bookView', {name: 'Books', nav: [{title: 'Books', link: '/books'}, {title: 'Authors', link: '/authors'}], book: books[id]});
});

module.exports = bookRouter;