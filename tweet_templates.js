const YEAR = "2023-24";

const pollTemplates = [
  "Who you got?\n",
  "Without knowing names, who would you prefer?\n",
  "Who is better based on solely on these stats?\n",
  "If you could only have one...\n",
  "Pick the better player\n",
  "1 or 2 🤔...\n",
  "You can only choose one\n",
  "Guess the more well-known player\n",
];

const replyTemplates = [
  (playerA, playerB) => {
    return `${playerA.cm_name}: ${playerA.pts}/${playerA.reb}/${playerA.ast} - ${playerA.cm_ts_pct}%
${playerB.cm_name}: ${playerB.pts}/${playerB.reb}/${playerB.ast} - ${playerB.cm_ts_pct}%`;
  },
];

const standaloneTemplates = [
  (playerA, playerB) => {
    return `${YEAR} Stats (pts/ reb /ast - ts%):
${playerA.cm_name}: ${playerA.pts}/${playerA.reb}/${playerA.ast} - ${playerA.cm_ts_pct}%
${playerB.cm_name}: ${playerB.pts}/${playerB.reb}/${playerB.ast} - ${playerB.cm_ts_pct}%
#NBA`;
  },
];

module.exports = { pollTemplates, replyTemplates, standaloneTemplates };
