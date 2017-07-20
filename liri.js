// Object
var nodinIt = {
  // global variables,
  userCommand: process.argv[2],
  userSongChoice: process.argv[3] || 'The Sign',

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
      query: this.userSongChoice
    }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      // Console log artist, song name, preview link (external URL), song album
      console.log("Artist: " + data.tracks.items[0].artists[0].name);
      // ASK VINNY why i can't simply log '(this.userSongChoice)', even though we are calling function outside of object
      console.log(nodinIt.userSongChoice);
      console.log("Album: " + data.tracks.items[0].album.name);
      console.log("Preview Link: " + data.tracks.items[0].external_urls.spotify);
    });
  },
};

if (nodinIt.userCommand === "my-tweets") {
  nodinIt.getTwitter();
} else if (nodinIt.userCommand === 'spotify-this-song') {
  nodinIt.getSpotify();
}
