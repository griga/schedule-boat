/**
 * Created by griga on 2/11/16.
 */

"use strict";

const Http = require('http');

const proxies = require('./proxies');

const ping = (task)=>{
    return new Promise((resolve, reject)=>{
        let proxy = proxies.getNext();
        const req = Http.request({
            host: proxy.host,
            // proxy IP
            port: proxy.port,
            // proxy port
            method: 'GET',
            path: task.url // full URL as path
        }, (res) => {
            res.on('data', function (data) {

                    if(task.expect && data.search(task.expect) == -1){
                        console.log('ping via proxy fail. conditions not met for ' + task.url)
                        proxy.fails++;
                        reject(data)

                    } else {
                        console.log('ping via proxy success. conditions met for ' + task.url)
                        proxy.successes++;
                        resolve(data)

                    }


            });
        });
        req.end();
    })
}

module.exports = {
    ping
}