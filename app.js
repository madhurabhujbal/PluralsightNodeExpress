const express = require('express');
const debug = require('debug')('app');
const chalk = require('chalk');
const morgan = require('morgan');
const path = require('path');

const app = express();
const bookRouter = express.Router();

app.use(morgan('tiny')); // switch 'tiny'->'combined' for detailed log
app.use(express.static(path.join(__dirname, '/public/'))); // express.static indicates that static files in given directory are to be referred
/*
similar to above, specify alternate path for finding css/js files, if not found in /public folder.
e.g: app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')))
 */

app.set('views', __dirname + '/views/');
app.set('view engine', 'ejs');

const books = [{title: 'A book of simple living' , author: 'Ruskin Bond'}, {title: 'Chaavaa', author: 'Shivaji Sawant'}, {title: 'Batatyachi chaal', author: 'P. L. Deshpande'}];

bookRouter.route('/')
.get((req, res) => {
    res.render('books', {name: 'Books', nav: [{title: 'Books', link: '/books'}, {title: 'Authors', link: '/authors'}], books});
});

app.use('/books', bookRouter);

app.get('/', (req, res) => {
  res.render('index', {name: 'Madhura', nav: [{title: 'Books', link: '/books'}, {title: 'Authors', link: '/authors'}], books});
});

app.get('/authors', (req, res) => {
    res.send('Page under construction');
});

app.listen(3000, () => {
  debug(`server listening on port ${chalk.blueBright('3000')}`);
});
