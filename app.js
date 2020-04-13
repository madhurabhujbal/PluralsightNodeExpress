const express = require('express');
const debug = require('debug')('app');
const chalk = require('chalk');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.use(morgan('tiny')); // switch 'tiny'->'combined' for detailed log
app.use(express.static(path.join(__dirname, '/public/'))); // express.static indicates that static files in given directory are to be referred
/*
similar to above, specify alternate path for finding css/js files, if not found in /public folder.
e.g: app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')))
*/

app.set('views', __dirname + '/views/');
app.set('view engine', 'ejs');

const books = [{title: 'A book of simple living' , author: 'Ruskin Bond'}, {title: 'Chaavaa', author: 'Shivaji Sawant'}, {title: 'Batatyachi chaal', author: 'P. L. Deshpande'}];
const nav = [{title: 'Books', link: '/books'}, {title: 'Authors', link: '/authors'}];

const bookRouterFunction = require('./books');
const bookRouter = bookRouterFunction(nav);
const adminRouter = require('./admin');
app.use('/books', bookRouter);
app.use('/admin', adminRouter);

app.get('/', (req, res) => {
  res.render('index', {name: 'Home', nav});
});

app.get('/authors', (req, res) => {
    res.send('Page under construction');
});

app.listen(3000, () => {
  debug(`server listening on port ${chalk.blueBright('3000')}`);
});
