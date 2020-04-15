const {MongoClient, ObjectID} = require('mongodb');
const debug = require('debug')('app:bookController');
const bookService = require('../services/goodreadsService');

function controller (nav) {
    function getIndex(req, res) {
        //connect
        const url = 'mongodb://localhost:27017';
        const dbName = 'LibraryApp';
        const collectionName = 'books';
        let conn;
        (async function mongo(){
            try{
            conn = await MongoClient.connect(url);
            //retrieve
            const db = conn.db(dbName);
            const booksCollection = await db.collection(collectionName);
            const books = await booksCollection.find().toArray();
            res.render('bookListView', {name: 'Books', nav, books});
        }
        catch(err){
            debug(err.stack);
        }
        //close
        conn.close();
    }());
    }

    function getId(req, res) {
        const {id} = req.params;
        //connect
        const url = 'mongodb://localhost:27017';
        const dbName = 'LibraryApp';
        const collectionName = 'books';
        let conn;
        (async function mongo(){
            try{
            conn = await MongoClient.connect(url);
            //retrieve
            const db = conn.db(dbName);
            const booksCollection = await db.collection(collectionName);
            const book = await booksCollection.findOne({'_id': new ObjectID(id)});
            book.details = await bookService.getById(book.bookId);
            res.render('bookView', {name: 'Books', nav, book});
        }
        catch(err){
            debug(err.stack);
        }
        //close
        conn.close();
    }());
    }

    function middleware(req, res, next) {
        if (req.user) {
            next();
        } else {
            res.redirect('/');
        }
    }

    return {
        getIndex,
        getId,
        middleware
    };
}

module.exports = controller;