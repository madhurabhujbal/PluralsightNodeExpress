const express = require('express');

const bookRouter = express.Router();

const books = [{title: 'A book of simple living' , author: 'Ruskin Bond'}, {title: 'Chaavaa', author: 'Shivaji Sawant'}, {title: 'Batatyachi chaal', author: 'P. L. Deshpande'}];

bookRouter.route('/')
.get((req, res) => {
    res.render('books', {name: 'Books', nav: [{title: 'Books', link: '/books'}, {title: 'Authors', link: '/authors'}], books});
});

bookRouter.route('/:id')
.get((req, res) => {
    res.send('Displaying information of book number:' + req.params.id);
});

module.exports = bookRouter;