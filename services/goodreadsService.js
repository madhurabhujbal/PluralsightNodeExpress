const axios = require('axios');
const xml2js = require('xml2js');
const debug = require('debug')('app:goodreadsService');

const parser = xml2js.Parser({ explicitArray : false });
function bookService() {
    function getById(bookId) {
        return new Promise((resolve, reject) => {
            axios.get(`https://www.goodreads.com/book/show/${bookId}.xml?key=WaN4ff1kNJ9KovbI03jjA`)
            .then((response) => {
                debug(response);
                parser.parseString(response.data, (error, jsonResult) => {
                    if(error) {
                        reject(error);
                    } else {
                        resolve(jsonResult.GoodreadsResponse.book);
                    }
                });
            })
            .catch((error) => {
                debug(error);
                reject(error);
            });
        });
    }

    return {getById};
}

module.exports = bookService();