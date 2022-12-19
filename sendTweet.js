require('dotenv').config();
const { TwitterClient } = require('twitter-api-client');
const PlayerComparison = require('./models/PlayerComparison');
const InitialTweet = require('./models/InitialTweet');
const { buildInitialTweet, buildReplyTweet } = require('./buildTweets');

const twitterClient = new TwitterClient({
  apiKey: process.env.TWITTER_API_KEY,
  apiSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

const sendTweets = async () => {
  try {
    console.log('begin sendTweets()');
    const players = await PlayerComparison.findOneAndDelete();
    console.log('found a PlayerComparison');
    const x = Math.floor(Math.random() * 2) == 0;
    let playerA = x ? players.playerA : players.playerB;
    let playerB = x ? players.playerB : players.playerA;
    const initialTweet = buildInitialTweet(playerA, playerB);
    console.log('built the initial tweet');
    const initialRes = await twitterClient.tweetsV2.createTweet(initialTweet);
    console.log(initialRes);
    setTimeout(async function () {
      try {
        console.log('Made it past the 2 sec wait');
        console.log(`Here is the id: ${initialRes.data.id}`);
        const replyTweet = buildReplyTweet(
          playerA,
          playerB,
          initialRes.data.id
        );
        const replyRes = await twitterClient.tweetsV2.createTweet(replyTweet);
        console.log(replyRes);
      } catch (error) {
        console.log(error);
      }
    }, 2000);
  } catch (error) {
    console.log(error);
  }
};

// TODO make function to send only initial tweet and store most recently created tweet id and players
const sendInitialTweet = async () => {
  try {
    console.log('begin sendInitialTweets()');
    const players = await PlayerComparison.findOneAndDelete();
    console.log('found a PlayerComparison');
    const x = Math.floor(Math.random() * 2) == 0;
    let playerA = x ? players.playerA : players.playerB;
    let playerB = x ? players.playerB : players.playerA;
    const tweet = buildInitialTweet(playerA, playerB);
    console.log('built the initial tweet');
    const initialRes = await twitterClient.tweetsV2.createTweet(tweet);
    console.log(initialRes);
    const initialTweet = new InitialTweet({
      tweet_id: initialRes.data.id,
      player1: playerA,
      player2: playerB,
    });
    const savedTweet = await initialTweet.save();
    console.log(`Initial saved tweet is: ${savedTweet}`);
  } catch (error) {
    console.log(error);
  }
};
// TODO make function to send fetch most recently created tweet id and players and post reply tweet
const sendReply = async () => {
  try {
    const { player1, player2, tweet_id } =
      await InitialTweet.findOneAndDelete(); //TODO: Error handling (when no initial tweets, just stop and report there are none)
    const replyTweet = buildReplyTweet(player1, player2, tweet_id);
    const replyRes = await twitterClient.tweetsV2.createTweet(replyTweet);
    console.log(replyRes);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  sendTweets,
  sendInitialTweet,
  sendReply,
};
