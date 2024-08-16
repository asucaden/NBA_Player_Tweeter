const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playerComparisonSchema = new Schema({
  playerA: {
    cm_name: String,
    pts: Number,
    ast: Number,
    reb: Number,
    cm_ts_pct: Number,
  },
  playerB: {
    cm_name: String,
    pts: Number,
    ast: Number,
    reb: Number,
    cm_ts_pct: Number,
  },
});

module.exports = PlayerComparison = mongoose.model(
  "playerComparison",
  playerComparisonSchema
);
