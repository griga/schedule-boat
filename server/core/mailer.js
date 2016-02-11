"use strict";
const _ = require('lodash');
const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport('smtps://scheduleboat%40gmail.com:scheduleboat4all@smtp.gmail.com');



let mailOptions = {
    from: 'Schedule Boat Mailer <scheduleboat@gmail.com>', // sender address
    to: 'grigach@gmail.com', // list of receivers

};


const notify = (message)=>{

    transporter.sendMail(_.extend(mailOptions, {
        message
    }), function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
}
const error = (message, task)=>{

    transporter.sendMail(_.extend(mailOptions, {
        subject: 'Scheduler Error',
        html: message + '\n ' + task.url + '\n' + task.fails
    }), function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
}



module.exports = {
    transporter,
    notify,
    error
};
