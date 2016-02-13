/**
 * Created by griga on 2/11/16.
 */

"use strict";

const Http = require('http');

const proxies = require('./proxies');
const randomUa = require('random-ua')

const fetch = (url, proxy)=> {
    proxy = proxy || proxies.getNext()
    return new Promise((resolve, reject)=> {
        const req = Http.request({
            host: proxy.host,
            port: proxy.port,
            method: 'GET',
            path: url,
            headers: {
                'User-Agent': randomUa.generate()
            }
        }, (res) => {
            res.on('data', (data) => {
                proxy.successes++;
                resolve(data)
            });
            res.on('error', (error) => {
                proxy.fails++;
                console.log('fetch error', error)
            })
        });
        req.end();
    })
}

const ping = (task)=> {
    return new Promise((resolve, reject)=> {
        fetch(task.url).then((data)=> {
            if (task.expect && data.toString().search(task.expect) == -1) {
                task.fails++;
                reject('fetch via proxy fail. conditions not met')
            }

            if(task.related){
                Promise.all(task.related.map((rel)=>{
                    return fetch(task.url + rel)
                })).then(resolve)
            } else {
                resolve()
            }
        })
    })


}

module.exports = {
    fetch,
    ping
}