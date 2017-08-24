// Object
var nodinIt = {
  // global variables, continuations of node array
  userCommand: process.argv[2],
  userSongChoice: process.argv[3],
  userMovie: process.argv[3] || 'Mr. Nobody',

  getTwitter: function() {
    // node knows to look for Twitter in node_modules folder
    var Twitter = require('twitter');
    // calling keys in key.js and assigning them
    var twitterKeys = require('./key').twitterKeys;
    // npm syntax for twitter package
    var client = new Twitter(twitterKeys);
    var params = {
      screen_name: 'WhatWoodJDubDo',
      count: 20
    };

    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      // if data retrieval is success...
      if (!error && response.statusCode === 200) {
        // counting thru and printing tweets
        for (var i = 0; i < 20; i++) {
          console.log(tweets[i].text);
          var fs = require('fs');
          fs.appendFile("log.txt", tweets[i].text, 'utf8', function(error, response) {
            if (error) {
              throw error;
            }
          });
        };
        console.log('Data was appended to log.txt file!');
      } else {
        console.log(error);
      }
    });


  },

  getSpotify: function(saySong) {
    // same variables / syntax essentially as above
    var Spotify = require('node-spotify-api');
    var spotifyKeys = require('./key').spotifyKeys;
    var spotify = new Spotify(spotifyKeys);

    spotify.search({
      type: 'track',
      query: saySong || 'The Sign'
    }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      // Console log artist, song name, preview link (external URL), song album
      // console.log(this.userSongChoice);
      console.log("Artist: " + data.tracks.items[0].artists[0].name);
      console.log("Song: " + saySong);
      console.log("Album: " + data.tracks.items[0].album.name);
      console.log("Preview Link: " + data.tracks.items[0].external_urls.spotify);
    });
  },

  getOMDB: function() {
    var request = require('request');
    var omdbSite = "http://www.omdbapi.com/?t=" + this.userMovie + "&y=&plot=short&apikey=40e9cece";

    // title, year, IMDB rating, Rotten Tomatoes rating, country, language, Plot, Actors
    request(omdbSite, function(error, response, body) {
      body = JSON.parse(body);
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

      console.log('Movie Title: ' + body.Title);
      console.log('Year: ' + body.Year);
      console.log('IMDB Rating: ' + body.imdbRating);
      console.log('Rotten Tomatoes: ' + body.Ratings[1].Value);
      console.log('Country: ' + body.Country);
      console.log('Language: ' + body.Language);
      console.log('Plot: ' + body.Plot);
      console.log('Actors: ' + body.Actors);
    });
  },

  doWhatItSays: function() {
    var fs = require('fs');
    fs.readFile("random.txt", 'utf8', function(error, data) {
      var dataArray = data.split(',');
      if (error) {
        return console.log(error);
      }
      sayCommand = dataArray[0];
      saySong = dataArray[1];
      nodinIt.getSpotify(saySong);
    })
  }
};

if (nodinIt.userCommand === "my-tweets") {
  nodinIt.getTwitter();
} else if (nodinIt.userCommand === 'spotify-this-song') {
  nodinIt.getSpotify(nodinIt.userSongChoice);
} else if (nodinIt.userCommand === 'movie-this') {
  nodinIt.getOMDB();
} else if (nodinIt.userCommand === 'do-what-it-says') {
  nodinIt.doWhatItSays();
}
