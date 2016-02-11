"use strict";

const schedule = require('node-schedule');

const mailer = require('./mailer')


const pinger = require('./pinger')

const schedulePing = (task)=>{
    pinger.ping(task)
    //schedule.scheduleJob('*/10 * * * *', function(){
    //
    //    console.log('scheduled ping for ', task)
    //
    //});
}

module.exports = (db)=>{
    let tasks = db.getCollection('tasks')

    tasks.find({}).forEach((task)=>{
        switch (task.type){
            case 'ping':
                schedulePing(task)
                break;

        }
    })

    //console.log('scheduler ', db.listCollections())
}