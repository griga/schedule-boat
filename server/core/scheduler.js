"use strict";

const schedule = require('node-schedule');

const mailer = require('./mailer')


const pinger = require('./pinger')

const schedulePing = (task)=>{

    schedule.scheduleJob('*/20 * * * * *', function(){
        pinger.ping(task).then(()=>{
            console.log('ping success', task)
        }, (reason)=>{
            if(task.fails % 10 == 0 ){
                mailer.error(reason, task)
            }
        })
    });
}

schedule.scheduleJob('*/30 * * * *', ()=>{
    mailer.notifyAlive();
})

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