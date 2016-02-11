"use strict";

const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport('smtps://scheduleboat%40gmail.com:scheduleboat4all@smtp.gmail.com');

module.exports = transporter;
