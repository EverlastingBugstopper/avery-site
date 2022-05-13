const path = require("path");
const fs = require("fs");
const { makeBadge } = require("badge-maker");
const {
  LIGHTHOUSE_DIR,
  displayFile,
  info,
} = require("./utils.js");
const { validate } = require("./scores.js");

const BADGES_DIR = path.join(LIGHTHOUSE_DIR, "badges");

const scores = validate();

for (const { name, score } of scores) {
  const badgePath = path.join(BADGES_DIR, `${name}.svg`);
  let color = "red";
  if (score >= 50) {
    color = "yellow";
  } else if (score >= 90) {
    color = "success";
  }
  const badgeContents = makeBadge({
    label: name,
    message: `${score}%`,
    labelColor: "gray",
    color,
  });
  info(`creating '${name}' badge with a score of '${score}'...`);
  fs.writeFileSync(badgePath, badgeContents);
  info(`created ${displayFile(badgePath)} ✅`);
}

info(`created ${scores.length} badges! 🎈🎉🥳`);
