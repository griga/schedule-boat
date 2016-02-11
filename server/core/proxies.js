/**
 * Created by griga on 2/11/16.
 */


"use strict";

let proxies = require('../db/proxies.json').map((proxy)=>{
    let split = proxy.split(':')
    return {
        host: split[0],
        port: split[1],
        successes: 0,
        fails: 0
    }

})




let currentIdx = 0;

function getNext(){
    if (currentIdx == proxies.length){
        currentIdx = 0
    }
    return proxies[currentIdx++]
}

module.exports = {
    getNext
}