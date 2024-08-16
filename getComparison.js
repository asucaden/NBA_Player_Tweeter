const Player = require("./models/Player");
const PlayerComparison = require("./models/PlayerComparison");

// These constants calibrate how 2 players are compared
const TOTSPREAD = 5; // Controls how similar the 2 players pts+asts+rebs must be.  Lower means players must be closer statisticly.
const FAMEDIFF = 1; // Controls how different the 2 players fame can be.  Lower means more similar fame levels is allowed
const TSSPREAD = 0.08; // Controls how different the 2 players TS% can be.

//// STAT RANGES
// PTS Range- 10 - 30.6
const PTSMIN = 12;
const PTSMAX = 28;
// AST Range- .8 - 10.8
const ASTMIN = 2;
const ASTMAX = 9;
// TRB Range- 1.6 - 14.7
const TRBMIN = 3;
const TRBMAX = 10;
// StatTot Range- 12.7 - 48.8
const STATTOTMIN = 12.7;
const STATTOTMAX = 48.8;

const makeComparison = async () => {
  var players = [];
  try {
    var famousPlayer = {};
    var sleeperPlayer = {};
    var minFame = 0;
    var maxFame = 0;
    var i = 0;
    var checkAgain = true;
    while (checkAgain) {
      i++;
      const ptsTarget = Math.random() * (PTSMAX - PTSMIN) + PTSMIN;
      const astTarget = Math.random() * (ASTMAX - ASTMIN) + ASTMIN;
      const trbTarget = Math.random() * (TRBMAX - TRBMIN) * TRBMIN;
      const totTarget = ptsTarget + astTarget + trbTarget;
      const ptsSpread = ptsTarget / 6;
      const astSpread = astTarget / 3;
      const trbSpread = trbTarget / 3;

      players = await Player.find({
        pts: { $gte: ptsTarget - ptsSpread, $lte: ptsTarget + ptsSpread },
        ast: { $gte: astTarget - astSpread, $lte: astTarget + astSpread },
        reb: { $gte: trbTarget - trbSpread, $lte: trbTarget + trbSpread },
        cm_3_stat_tot: {
          $gte: totTarget - TOTSPREAD,
          $lte: totTarget + TOTSPREAD,
        },
      });
      if (players.length >= 2) {
        for (let j = 0; j < Math.min(players.length ** 3, 200); j++) {
          let idx1 = Math.floor(Math.random() * players.length);
          let idx2 = Math.floor(Math.random() * players.length);
          const p1 = players[idx1];
          const p2 = players[idx2];
          if (
            Math.abs(p1.cm_fame - p2.cm_fame) > FAMEDIFF &&
            Math.abs(p1.cm_ts_pct - p2.cm_ts_pct) < TSSPREAD
          ) {
            if (p1.cm_fame > p2.cm_fame) {
              famousPlayer = players[idx1];
              sleeperPlayer = players[idx2];
            } else {
              famousPlayer = players[idx2];
              sleeperPlayer = players[idx1];
            }
            checkAgain = false;
            break;
          }
        }
      }
    }
    console.log("Took" + i + "tries");
    const res = {
      playerA: {
        cm_name: sleeperPlayer.cm_name,
        pts: Math.round(sleeperPlayer.pts * 10) / 10,
        ast: Math.round(sleeperPlayer.ast * 10) / 10,
        reb: Math.round(sleeperPlayer.reb * 10) / 10,
        cm_ts_pct: Math.round(sleeperPlayer.cm_ts_pct * 1000) / 10,
      },
      playerB: {
        cm_name: famousPlayer.cm_name,
        pts: Math.round(famousPlayer.pts * 10) / 10,
        ast: Math.round(famousPlayer.ast * 10) / 10,
        reb: Math.round(famousPlayer.reb * 10) / 10,
        cm_ts_pct: Math.round(famousPlayer.cm_ts_pct * 1000) / 10,
      },
    };
    console.log(res);
    return res;
  } catch (err) {
    console.log(`makeComparison.js Error: ${err}`);
  }
};

const getComparison = async () => {
  try {
    let players = await PlayerComparison.findOneAndDelete();
    if (!players) {
      console.log("Out of comparisons from DB, making a fresh one now...");
      players = await makeComparison();
    }
    console.log("PlayerComparison aquired");
    const x = Math.floor(Math.random() * 2) == 0;
    let playerA = x ? players.playerA : players.playerB;
    let playerB = x ? players.playerB : players.playerA;
    return { playerA, playerB };
  } catch (error) {
    console.log(error);
  }
  return null;
};

module.exports = { makeComparison, getComparison };
