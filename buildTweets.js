const {
  pollTemplates,
  replyTemplates,
  standaloneTemplates,
} = require('./tweet_templates');

const POLL_LENGTH = 5 * 60; // in minutes

const buildPollTweet = (playerA, playerB) => {
  const idx = Math.floor(Math.random() * pollTemplates.length);
  const tweetText = pollTemplates[idx] + '#NBA (pts / reb / ast - ts%)\n';
  const choices = [
    `${playerA.pts}/${playerA.reb}/${playerA.ast} - ${playerA.cm_ts_pct}`,
    `${playerB.pts}/${playerB.reb}/${playerB.ast} - ${playerB.cm_ts_pct}`,
  ];
  return {
    text: tweetText,
    poll: {
      options: choices,
      duration_minutes: POLL_LENGTH,
    },
  };
};

const buildReplyTweet = (playerA, playerB, initialTweetID) => {
  const idx = Math.floor(Math.random() * replyTemplates.length);
  const replyText =
    replyTemplates[idx](playerA, playerB) +
    '\n#NBA #' +
    playerA.cm_name.replace(/\s+/g, '') +
    ' #' +
    playerB.cm_name.replace(/\s+/g, '');

  console.log(`text is ${replyText}`);
  console.log(`id is ${initialTweetID}`);
  return {
    text: replyText,
    reply: {
      in_reply_to_tweet_id: initialTweetID,
    },
  };
};

const buildStandaloneTweet = (playerA, playerB) => {
  const idx = Math.floor(Math.random() * standaloneTemplates.length);
  const tweetText =
    standaloneTemplates[idx](playerA, playerB) +
    ' #' +
    playerA.cm_name.replace(/\s+/g, '') +
    ' #' +
    playerB.cm_name.replace(/\s+/g, '');
  return { text: tweetText };
};

module.exports = { buildPollTweet, buildReplyTweet, buildStandaloneTweet };
