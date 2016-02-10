var app = require('express')();

var http = require('http').Server(app);

var env = process.env.NODE_ENV == 'production' ? 'production' : 'development';

var config = require('./config/config')[env];

require('./config/express')(app, config);

http.listen(config.port, config.host, function () {
    console.log('express running at ' + config.host + ':' + config.port)
});

module.exports = app;
