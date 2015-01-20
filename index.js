var app = require('./server/server.js');
var port = process.env.port || 8080;
app.listen(port);
console.log('Listening on Port '+port)
