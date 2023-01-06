const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');
const {
  sendTweets,
  sendPollTweet,
  sendStandaloneTweet,
  sendReply,
} = require('./sendTweet');

const run = async () => {
  try {
    await mongoose.connect(db);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Exit process with failure
  }

  const initial_tweet = await InitialTweet.findOne();
  if (initial_tweet) {
    await sendReply();
    return {
      message: 'Sent a reply tweet!',
      //event,
    };
  } else {
    const x = Math.floor(Math.random() * 4) == 0;
    if (x) {
      await sendPollTweet();
      return {
        message: 'Sent a standalone tweet!',
        //event,
      };
    } else {
      await sendStandaloneTweet();
      return {
        message: 'Sent a poll tweet!',
        //event,
      };
    }
  }
};

run();
