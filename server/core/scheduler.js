"use strict";

const schedule = require('node-schedule');

const mailer = require('./mailer')


// setup e-mail data with unicode symbols
var mailOptions = {
    from: 'M22 Foo 👥 <scheduleboat@gmail.com>', // sender address
    to: 'grigach@gmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world 🐴', // plaintext body
    html: '<b>Hello world 🐴</b>' // html body
};

schedule.scheduleJob('*/5 * * * *', function(){
    // send mail with defined transport object
    mailer.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
});

module.exports = (db)=>{
    db.getCollection('task')
    console.log('scheduler ', db.listCollections())
}