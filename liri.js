var twitter = require('./node_modules/twitter')
var twitResponse = require('./key');
var ck = twitResponse.twitterKeys.consumer_key;
var cs = twitResponse.twitterKeys.consumer_secret;
var atk = twitResponse.twitterKeys.access_token_key;
var ats = twitResponse.twitterKeys.access_token_secret;

var client = new twitter(twitResponse);

var params = {
  screen_name: 'WhatWoodJDubDo',
  count: 20,
};

client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(response);
  } else {
    console.log(error);
  }
});
