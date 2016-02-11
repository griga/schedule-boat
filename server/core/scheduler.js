"use strict";

const schedule = require('node-schedule');

const mailer = require('./mailer')


const pinger = require('./pinger')

const schedulePing = (task)=>{

    schedule.scheduleJob('*/60 * * * *', function(){

        pinger.ping(task).then(()=>{

        }, (reason)=>{
            mailer.error(reason)
        })

    });
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