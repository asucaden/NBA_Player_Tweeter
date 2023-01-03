require('dotenv').config();
const { TwitterClient } = require('twitter-api-client');
const { getComparison } = require('./getComparison.js');
const InitialTweet = require('./models/InitialTweet');
const {
  buildPollTweet,
  buildReplyTweet,
  buildStandaloneTweet,
} = require('./buildTweets');

const twitterClient = new TwitterClient({
  apiKey: process.env.TWITTER_API_KEY,
  apiSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

const sendTweets = async () => {
  try {
    await sendPollTweet();
    setTimeout(sendReply, 3000);
  } catch (error) {
    console.log(error);
  }
};

const sendPollTweet = async () => {
  try {
    const { playerA, playerB } = await getComparison();
    const tweet = await buildPollTweet(playerA, playerB);
    const initialRes = await twitterClient.tweetsV2.createTweet(tweet);
    console.log(initialRes);
    const initialTweet = new InitialTweet({
      tweet_id: initialRes.data.id,
      player1: playerA,
      player2: playerB,
    });
    const savedTweet = await initialTweet.save();
    console.log(`Initial saved tweet is: ${savedTweet}`);
    return initialRes;
  } catch (error) {
    console.log(error);
  }
  return;
};

const sendStandaloneTweet = async () => {
  try {
    const { playerA, playerB } = await getComparison();
    const tweet = await buildStandaloneTweet(playerA, playerB);
    const initialRes = await twitterClient.tweetsV2.createTweet(tweet);
    console.log(initialRes);
    return initialRes;
  } catch (error) {
    console.log(error);
  }
  return;
};

const sendReply = async () => {
  try {
    const initial_tweet = await InitialTweet.findOneAndDelete();
    if (initial_tweet) {
      const { player1, player2, tweet_id } = initial_tweet;
      const replyTweet = await buildReplyTweet(player1, player2, tweet_id);
      const replyRes = await twitterClient.tweetsV2.createTweet(replyTweet);
      console.log(replyRes);
      return replyRes;
    } else console.log('No tweet found');
  } catch (error) {
    console.log(error);
  }
  return;
};

module.exports = {
  sendTweets,
  sendPollTweet,
  sendStandaloneTweet,
  sendReply,
};
