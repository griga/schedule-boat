/**
 * Created by griga on 2/11/16.
 */

"use strict";

const Http = require('http');

const proxies = require('./proxies');
const randomUa = require('random-ua')

const ping = (task)=> {
    return new Promise((resolve, reject)=> {
        let proxy = proxies.getNext();
        const req = Http.request({
            host: proxy.host,
            port: proxy.port,
            method: 'GET',
            path: task.url,
            headers: {
                'User-Agent': randomUa.generate()
            }
        }, (res) => {
            res.on('data', function (data) {
                let content = data.toString();
                if (task.expect && content.search(task.expect) == -1) {

                    proxy.fails++;
                    task.fails++;
                    reject('ping via proxy fail. conditions not met')
                } else {
                    proxy.successes++;
                    resolve(content)
                }
            });
        });
        req.end();
    })
}

module.exports = {
    ping
}