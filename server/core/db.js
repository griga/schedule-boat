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
            expect: 'SmartAdmin',
            fails: 0,
            related: [
                'build/vendor.bundle.js',
                'build/bundle.js',
                'styles/css/smartadmin-production.min.css'
            ]
        })
        tasks.insert({
            type: 'ping',
            url: 'http://aia-griga.rhcloud.com/',
            expect: 'AiA',
            fails: 0,
            related: [
                'style/css/style.css',
                'build/main.js',
            ]
        })
        tasks.insert({
            type: 'ping',
            url: 'http://mir-mironova.rhcloud.com/',
            expect: 'Mironova',
            fails: 0,
            related: [
                'themes/mir/css/style.css',
            ]
        })
        tasks.insert({
            type: 'ping',
            url: 'http://likarski-zasoby.rhcloud.com/',
            expect: 'Лiкарськi засоби',
            fails: 0,
            related: [
                '/css/style.css',
            ]
        })
        console.log('init db data', db.listCollections( ));

        db.save();
        resolve(db)
    }
})


module.exports = promise;
