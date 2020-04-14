const express = require('express');
const {MongoClient, ObjectID} = require('mongodb');
const debug = require('debug')('app:books');

function router(nav) {
    const bookRouter = express.Router();

    bookRouter.use((req, res, next) => {
        if (req.user) {
            next();
        } else {
            res.redirect('/');
        }
    });

    bookRouter.route('/')
    .get((req, res) => {
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

    });

    bookRouter.route('/:id')
    .get((req, res) => {
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
            res.render('bookView', {name: 'Books', nav, book});
        }
        catch(err){
            debug(err.stack);
        }
        //close
        conn.close();
    }());
    });
    return bookRouter;
};

module.exports = router;