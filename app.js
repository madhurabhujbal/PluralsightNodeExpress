var express = require('express');

var app = express();

app.get('/', (req, res) =>
{
    console.log('request received');
    res.send('Hello world');
    //res.sendStatus(200);

});

app.listen(3000, ()=>{
    console.log('server listening on port 3000');
});