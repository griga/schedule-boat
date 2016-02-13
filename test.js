/**
 * Created by griga on 2/13/16.
 */

//
//const request = require('request')
//const randomUa = require('random-ua')
//
//request({
//    url: 'http://sandbox-griga.rhcloud.com/build/bundle.js',
//    method: "GET",
//    headers: {
//        "Cache-Control": "no-cache",
//        "User-Agent": randomUa.generate()
//    },
//    proxy: 'http://37.236.148.243:8080',
//
//}, (error, response, body) => {
//    if (!error && response.statusCode == 200) {
//        console.log(body) // Show the HTML for the Google homepage.
//    } else {
//        console.log(response)
//    }
//})

const FeedParser = require('feedparser')
    , request = require('request');

request('http://feeds.feedburner.com/ucoz/dnva')
    .on('error', function (error) {
        // handle any request errors
    }).pipe(new FeedParser({
    date: new Date()
}))
    .on('error', function (error) {
        // always handle errors
    })
    .on('readable', function () {
        // This is where the action is!
        var stream = this
            , meta = this.meta // **NOTE** the "meta" is always available in the context of the feedparser instance
            , item;

        while (item = stream.read()) {
            console.log(item);
        }
    });