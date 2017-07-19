var nodinIt = {

  userCommand: process.argv[2],
  userSongChoice: process.argv[3],

  getTwitter: function() {
    var Twitter = require('twitter');
    var twitterKeys = require('./key').twitterKeys;
    var client = new Twitter(twitterKeys);
    var params = {
      screen_name: 'WhatWoodJDubDo',
      count: 20
    };

    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error && response.statusCode === 200) {
        for (var i = 0; i < 20; i++) {
          console.log(tweets[i].text);
        }
      } else {
        console.log(error);
      }
    });
  },

  getSpotify: function() {
    var Spotify = require('node-spotify-api');
    var spotifyKeys = require('./key').spotifyKeys;
    var spotify = new Spotify(spotifyKeys);

    spotify.search({
      type: 'track',
      query: this.userSongChoice || 'The Sign'
    }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }

      console.log(data.tracks.items[0])
    });
  },
};

if (nodinIt.userCommand === "my-tweets") {
  nodinIt.getTwitter();
} else if (nodinIt.userCommand === 'spotify-this-song') {
  if (nodinIt.userSongChoice === '') {
    nodinIt.userSongChoice === 'The Sign';
  } else {
    nodinIt.getSpotify();
  }
}
