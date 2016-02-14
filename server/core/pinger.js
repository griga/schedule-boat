/**
 * Created by griga on 2/11/16.
 */

"use strict";

const request = require('request');

const proxies = require('./proxies');
const randomUa = require('random-ua')

const fetch = (url)=> {
    return new Promise((resolve, reject)=> {
        let proxy = proxies.getProxy()
        request({
            method: 'GET',
            url: url,
            headers: {
                "Cache-Control": "no-cache",
                "User-Agent": randomUa.generate()
            },
            proxy: proxy.url,
        }, (error, response, body) => {
            if (error) {
                proxy.fails++;
                console.log(`fetch ${url} error via ${proxy.url} ` )
                console.log(error)
                reject(error)
            } else {
                proxy.successes++;
                console.log(`fetch ${url} success via ${proxy.url} ` )
                resolve(body)

            }

        });
    })
}

const ping = (task)=> {
    return new Promise((resolve, reject)=> {
        fetch(task.url).then((data)=> {
            if (task.expect && data.toString().search(task.expect) == -1) {
                task.fails++;
                reject(`conditions not met. expected: ${task.expect}`)
            }

            if (task.related) {
                Promise.all(task.related.map((rel)=> {
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