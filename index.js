const { sendTweets, sendInitialTweet, sendReply } = require('./sendTweet');
const connectDB = require('./config/db');

connectDB();
console.log('index.js 1');
sendTweets();
console.log('index.js 2');
