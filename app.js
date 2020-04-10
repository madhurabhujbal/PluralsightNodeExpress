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

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/', 'index.html'));
});

app.listen(3000, () => {
  debug(`server listening on port ${chalk.blueBright('3000')}`);
});
