var express = require('express');
var debug = require('debug')('app');
var chalk = require('chalk');
var morgan = require('morgan');
var path = require('path');

var app = express();

//app.use(morgan('combined'));
app.use(morgan('tiny'));

app.get('/', (req, res) =>
{
    res.sendFile(path.join(__dirname, 'views/index.html'));
    //res.sendStatus(200);
});

app.listen(3000, ()=>{
    debug(`server listening on port ${chalk.blueBright('3000')}`);
});