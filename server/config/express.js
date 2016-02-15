"use strict";


const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser')
const fs = require('fs');
const scheduler = require('../core/scheduler');

require('../core/db').then((db)=>{
    scheduler(db)
})

console.log('========= APP_URL ===========')
console.log(process.env.APP_URL)

module.exports = (app, config) => {
    app.use(logger('dev'));
    app.use(express.static(config.staticPath))
    app.use(bodyParser.json())
};



