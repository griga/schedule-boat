"use strict";

const fs = require('fs')
const loki = require('lokijs');

let proxies = require('../db/proxies.json');

const filepath = __dirname + '/../db/db.json';

const db = new loki(filepath);
let promise = new Promise((resolve, reject)=>{
    if (fs.existsSync(filepath)){
        db.loadDatabase({}, function(){
            resolve(db)
        })
    } else {
        let tasks = db.addCollection('tasks');

        tasks.insert({
            type: 'ping',
            url: 'http://sandbox-griga.rhcloud.com',
            expect: 'Facebook Cover Designer',
            fails: 0
        })

        tasks.insert({
            type: 'ping',
            url: 'https://schedule-boat.herokuapp.com',
            expect: 'Schedule Boat',
            fails: 0
        })
        console.log('init db data', db.listCollections( ));

        db.save();
        resolve(db)
    }
})


module.exports = promise;
