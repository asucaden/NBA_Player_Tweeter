const {
  sendTweets,
  sendPollTweet,
  sendStandaloneTweet,
  sendReply,
} = require('./sendTweet');
const connectDB = require('./config/db');

connectDB();
setTimeout(sendTweets, 2000);
