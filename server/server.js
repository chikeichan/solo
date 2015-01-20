var express = require('express');
var bodyParser = require('body-parser');

app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

require('./handler.js')(app);

module.exports = app;