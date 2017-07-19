var Twitter = require('twitter');
var twitterKeys = require('./key').twitterKeys;

var client = new Twitter(twitterKeys);

var params = {
  screen_name: 'WhatWoodJDubDo',
  count: 1
};

var userInput = process.argv[2];

if (userInput === "my-tweets") {
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error && response.statusCode === 200) {
      // console.log(tweets);
      // console.log(response);
      // console.
      console.log(tweets[0].created_at);
    } else {
      console.log(error);
    }
  })
};
