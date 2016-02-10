var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser')
var fs = require('fs');

// var extractor = require('./../core/extractor')
// var downloader = require('./../core/downloader')


var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://scheduleboat%40gmail.com:scheduleboat4all@smtp.gmail.com');

// setup e-mail data with unicode symbols
var mailOptions = {
    from: 'Fred Foo 👥 <scheduleboat@gmail.com>', // sender address
    to: 'grigach@gmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world 🐴', // plaintext body
    html: '<b>Hello world 🐴</b>' // html body
};



var j = schedule.scheduleJob('*/5 * * * *', function(){
  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }
      console.log('Message sent: ' + info.response);
  });
});

module.exports = function (app, config) {
    app.use(logger('dev'));
    app.use(express.static(config.staticPath))
    app.use(bodyParser.json())
};
