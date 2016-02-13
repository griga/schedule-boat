/**
 * Created by griga on 2/11/16.
 */


"use strict";

const _ = require('lodash');

let proxies = require('../db/proxies.json').map((proxy)=>{
    let split = proxy.split(':')
    return {
        url: 'http://' + proxy,
        host: split[0],
        port: split[1],
        successes: 0,
        fails: 0
    }

})

let proxy;

let currentIdx = _.random(proxies.length - 1);

function getProxy(){
    if (currentIdx == proxies.length){
        currentIdx = 0
    }
    if(!proxy || proxy.fails == 10){
        proxy = proxies[currentIdx++]
    }
    return proxy;
}

module.exports = {
    getProxy
}