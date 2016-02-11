"use strict";

const schedule = require('node-schedule');

const mailer = require('./mailer')


const pinger = require('./pinger')

const schedulePing = (task)=>{

    schedule.scheduleJob('*/10 * * * *', function(){

        pinger.ping(task).then(()=>{

        }, (reason)=>{
            if(task.fails % 10 == 0 ){

                mailer.error(reason, task)
            }

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
}