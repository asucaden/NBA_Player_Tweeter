const { initialTweetTemplates, replyTemplates } = require('./tweet_templates');

const buildInitialTweet = (playerA, playerB) => {
  const idx = Math.floor(Math.random() * initialTweetTemplates.length);
  const tweetText =
    initialTweetTemplates[idx] +
    '#NBA @nba @espn #NBAonTNT\n(Stats format is: pts/reb/ast - ts%)\n';
  const choices = [
    `${playerA.pts}/${playerA.reb}/${playerA.ast} - ${playerA.cm_ts_pct}`,
    `${playerB.pts}/${playerB.reb}/${playerB.ast} - ${playerB.cm_ts_pct}`,
  ];
  const poll_time = 8 * 60;
  return {
    text: tweetText,
    poll: {
      options: choices,
      duration_minutes: poll_time,
    },
  };
};

const buildReplyTweet = (playerA, playerB, initialTweetID) => {
  const idx = Math.floor(Math.random() * replyTemplates.length);
  const replyText = replyTemplates[idx](playerA, playerB);
  console.log(`text is ${replyText}`);
  console.log(`id is ${initialTweetID}`);
  return {
    text: replyText,
    reply: {
      in_reply_to_tweet_id: initialTweetID,
    },
  };
};

module.exports = { buildInitialTweet, buildReplyTweet };

/*
  `If you had to pick one...\n
  Player A:\nPTS: ${playerA.pts}\nAST: ${playerA.ast}\nREB: ${playerA.reb}\nTS%: ${playerA.cm_ts_pct}\n
  Player B:\nPTS: ${playerB.pts}\nAST: ${playerB.ast}\nREB: ${playerB.reb}\nTS%: ${playerB.cm_ts_pct}`,
  
  `Without knowing names, who would you choose?\n
  Player A:\nPTS: ${playerA.pts}\nAST: ${playerA.ast}\nREB: ${playerA.reb}\nTS%: ${playerA.cm_ts_pct}\n
  Player B:\nPTS: ${playerB.pts}\nAST: ${playerB.ast}\nREB: ${playerB.reb}\nTS%: ${playerB.cm_ts_pct}`,
  
  `A or B?\n
  Player A:\nPTS: ${playerA.pts}\nAST: ${playerA.ast}\nREB: ${playerA.reb}\nTS%: ${playerA.cm_ts_pct}\n
  Player B:\nPTS: ${playerB.pts}\nAST: ${playerB.ast}\nREB: ${playerB.reb}\nTS%: ${playerB.cm_ts_pct}`,
  
  `Make your choice 🤔\n
  Player A:\nPTS: ${playerA.pts}\nAST: ${playerA.ast}\nREB: ${playerA.reb}\nTS%: ${playerA.cm_ts_pct}\n
  Player B:\nPTS: ${playerB.pts}\nAST: ${playerB.ast}\nREB: ${playerB.reb}\nTS%: ${playerB.cm_ts_pct}`
  */
