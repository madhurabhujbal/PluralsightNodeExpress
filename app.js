var express = require('express');

var app = express();

app.get('/', (req, res) =>
{
    console.log('request received');
    res.sendStatus(200);
    res.write('Hello world');

});

app.listen(3000, ()=>{
    console.log('server listening on port 3000');
});