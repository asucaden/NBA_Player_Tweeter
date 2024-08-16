const mongoose = require("mongoose");
const { initialTweetTemplates } = require("../tweet_templates");
const Schema = mongoose.Schema;

const initialTweetSchema = new Schema({
  player1: {
    cm_name: String,
    pts: Number,
    ast: Number,
    reb: Number,
    cm_ts_pct: Number,
  },
  player2: {
    cm_name: String,
    pts: Number,
    ast: Number,
    reb: Number,
    cm_ts_pct: Number,
  },
  tweet_id: String,
});

module.exports = InitialTweet = mongoose.model(
  "initialTweet",
  initialTweetSchema
);
