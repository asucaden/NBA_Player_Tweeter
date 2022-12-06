const mongoose = require('mongoose');
const connectDB = require('./config/db');
require('dotenv').config();
const { TwitterClient } = require('twitter-api-client');

const twitterClient = new TwitterClient({
  apiKey: process.env.TWITTER_API_KEY,
  apiSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

const PlayerComparison = require('./models/PlayerComparison');

connectDB();
const sendTweet = async () => {
  try {
    let players = await PlayerComparison.findOneAndRemove();
    x = Math.floor(Math.random() * 2) == 0;
    let playerA;
    let playerB;
    if (x) {
      playerA = players.playerA;
      playerB = players.playerB;
    } else {
      playerB = players.playerA;
      playerA = players.playerB;
    }

    let tweet =
      'Who you got?\n\n' +
      'Player A:' +
      '\nPTS: ' +
      playerA.PTS +
      '\nAST: ' +
      playerA.AST +
      '\nREB: ' +
      playerA.TRB +
      '\n\nPlayer B:\n' +
      'PTS: ' +
      playerB.PTS +
      '\nAST: ' +
      playerB.AST +
      '\nREB: ' +
      playerB.TRB;

    twitterClient.tweets
      .statusesUpdate({
        status: tweet,
      })
      .then(response => {
        console.log('Tweeted!', response.text);
        setTimeout(function () {
          console.log('made it here');
          tweet =
            '@c_swish_stats Player A is ' +
            playerA.Player +
            '\nPlayer B is ' +
            playerB.Player +
            '\nWant to change your mind?';
          twitterClient.tweets
            .statusesUpdate({
              status: tweet,
              in_reply_to_status_id: response.id_str,
            })
            .then(response => {
              console.log('Tweeted second time!', response.text);
            })
            .catch(err => {
              console.error(err);
            });
        }, 3000);
      })
      .then.catch(err => {
        console.error(err);
      });

    const id = response.id_str;
  } catch (error) {}
};

sendTweet();
