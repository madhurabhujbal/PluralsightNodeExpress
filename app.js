var express = require('express');
var debug = require('debug')('app');
var chalk = require('chalk');
var morgan = require('morgan');
var path = require('path');

var app = express();

app.use(express.static(path.join(__dirname, '/public/'))) //express.static indicates that static files in given directory are to be referred
app.use(morgan('tiny')); // switch 'tiny'->'combined' for detailed log

app.get('/', (req, res) =>
{
    res.sendFile(path.join(__dirname, 'views/', 'index.html'));
});

app.listen(3000, ()=>{
    debug(`server listening on port ${chalk.blueBright('3000')}`);
});