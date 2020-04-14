const {MongoClient, ObjectID} = require('mongodb');
const debug = require('debug')('app:bookController');

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
    return {
        getIndex
    };
}

module.exports = controller;