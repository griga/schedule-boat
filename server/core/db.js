var fs = require('fs')
var loki = require('lokijs');

var proxies = require('./../db/proxies.json');

var filepath = __dirname + '/../db/db.json';

let db;
if (fs.existsSync(filepath)){
    db = new loki(filepath);
    db.loadDatabase({}, function(){
        console.log('loaded', db.listCollections())
    })
} else {
    db = new loki();
    var tasks = db.addCollection('tasks');

    tasks.insert({
        type: 'ping',
        url: 'http://sandbox-griga.rhcloud.com',
        expect: 'Facebook Cover Designer'
    })

    tasks.insert({
        type: 'ping',
        url: 'https://schedule-boat.herokuapp.com',
        expect: 'Schedule Boat'
    })
    console.log('init db data', db.listCollections( ));

    db.save();
}


