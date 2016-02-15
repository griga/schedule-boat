"use strict";


const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser')
const fs = require('fs');
const scheduler = require('../core/scheduler');

require('../core/db').then((db)=>{
    scheduler(db)
})

require('heroku-self-ping')(process.env.APP_URL, {
    interval: 3 * 60 * 1000 // ping self every 3 minutes
});

module.exports = (app, config) => {
    app.use(logger('dev'));
    app.use(express.static(config.staticPath))
    app.use(bodyParser.json())
};



