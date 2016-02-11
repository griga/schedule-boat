"use strict";


const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser')
const fs = require('fs');
const scheduler = require('../core/scheduler');

require('../core/db').then((db)=>{
    scheduler(db)
})


module.exports = function (app, config) {
    app.use(logger('dev'));
    app.use(express.static(config.staticPath))
    app.use(bodyParser.json())
};



