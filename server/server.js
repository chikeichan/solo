var express = require('express');

app = express();

require('./handler.js')(app);

module.exports = app;