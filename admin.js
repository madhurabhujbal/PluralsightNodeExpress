const express = require('express');
const {MongoClient} = require('mongodb');
const debug = require('debug')('app:admin');

const adminRouter = express.Router();
const books = [
    {
       title:"A book of simple living",
       author:"Ruskin Bond",
       bookId:24838407
    },
    {
       "title":"Chaavaa",
       "author":"Shivaji Sawant",
       "bookId":11980343
    },
    {
       "title":"मधुशाला",
       "author":"हरिवंश राय बच्चन",
       "bookId":792429
    }
 ];

adminRouter.route('/').
get((req, res) => {
    //1. Establish connection to mongodb
    const url = 'mongodb://localhost:27017';
    const dbName = 'LibraryApp';

    (async function mongo(){
        let conn;
        try{
            conn= await MongoClient.connect(url);
            const database = conn.db(dbName);
            debug('Connected to mongodb successfully!!!');
            //2. Insert data
            const response = await database.collection('books').insertMany(books);
            res.json(response);
        }
        catch(err) {
            debug(err.stack);
        }
        //3. Close connection
        conn.close();
    }());
});
module.exports = adminRouter;