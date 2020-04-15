const express = require('express');
const {MongoClient} = require('mongodb');
const {getById} = require('./services/goodreadsService');
const debug = require('debug')('app:admin');

const adminRouter = express.Router();
const books = [37561461, 6727757, 13271546, 7607918, 12839928, 12374843, 43623339, 792429, 11980343, 24838407];
let booksJson = [];

adminRouter.route('/').
get((req, res) => {
    //1. Establish connection to mongodb
    const url = 'mongodb://localhost:27017';
    const dbName = 'LibraryApp';

    (async function mongo(){
        //Populate json array of book info
        for( let i = 0; i < books.length; i++) {
            const bookInfo = await getById(books[i]);
            //remote unnecessary attributes
            delete bookInfo.similar_books;
            delete bookInfo.popular_shelves;
            delete bookInfo.book_links;
            delete bookInfo.buy_links;
            delete bookInfo.series_works;
            delete bookInfo.reviews_widget;
            delete bookInfo.work;
            delete bookInfo.authors.author.image_url;
            delete bookInfo.authors.author.small_image_url;

            //Add book json to an array
            booksJson.push(bookInfo);
        }

        // Push books json into MongoDB
        let conn;
        try{
            conn= await MongoClient.connect(url);
            const database = conn.db(dbName);
            debug('Connected to mongodb successfully!!!');
            //2. Insert data
            const response = await database.collection('books').insertMany(booksJson);
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