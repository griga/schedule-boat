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
            url: 'http://sandbox-griga.rhcloud.com/',
            expect: 'Facebook Cover Designer',
            fails: 0,
            related: [
                'build/vendor.bundle.js',
                'build/bundle.js',
                'build/style.css'
            ]
        })

        tasks.insert({
            type: 'ping',
            url: 'http://schedule-boat.herokuapp.com/',
            expect: 'Schedule Boat',
            fails: 0,
            related: [
                'build/vendor.bundle.js',
                'build/bundle.js',
                'build/style.css'
            ]
        })
        tasks.insert({
            type: 'ping',
            url: 'http://sang-shockwave.rhcloud.com/',
            expect: 'SmartAdmin (AngularJS)',
            fails: 0,
            related: [
                'build/vendor.js',
                'build/app.js',
                'styles/css/smartadmin-production.min.css'
            ]
        })
        tasks.insert({
            type: 'ping',
            url: 'http://sarj-shockwave.rhcloud.com/',
            expect: 'SmartAdmin (ReactJS)',
            fails: 0,
            related: [
                'build/vendor.bundle.js',
                'build/bundle.js',
                'styles/css/smartadmin-production.min.css'
            ]
        })
        console.log('init db data', db.listCollections( ));

        db.save();
        resolve(db)
    }
})


module.exports = promise;
