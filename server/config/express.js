var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser')
var fs = require('fs');

// var extractor = require('./../core/extractor')
// var downloader = require('./../core/downloader')


module.exports = function (app, config) {
    app.use(logger('dev'));
    app.use(express.static(config.staticPath))
    app.use(bodyParser.json())
};
