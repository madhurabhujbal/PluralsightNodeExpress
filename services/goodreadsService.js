function bookService() {
    function getById() {
        return new Promise((resolve, reject) => {
            resolve({ 'description' : 'our description'});
        });
    }

    return {getById};
}

module.exports = bookService();