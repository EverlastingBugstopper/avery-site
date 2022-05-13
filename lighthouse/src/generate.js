const path = require("path");
const fs = require("fs");
const { makeBadge } = require("badge-maker");
const { LIGHTHOUSE_DIR, displayFile, info } = require("./utils.js");
const { updateScoresJSONFromReport, validateScoresJSON } = require("./scores.js");

const BADGES_DIR = path.join(LIGHTHOUSE_DIR, "badges");
try {
  fs.mkdirSync(BADGES_DIR);
} catch (e) {
  info(`this is probably fine: ${e}`)
}
const { changed, scores } = updateScoresJSONFromReport();

if (changed) {
  for (const [camelCaseName, score] of Object.entries(scores)) {
    const name = camelCaseName.replace(/([A-Z])/g, " $1").toLowerCase();
    const badgePath = path.join(BADGES_DIR, `${camelCaseName}.svg`);
    let color = "red";
    if (score >= 90) {
      color = "success"
    } else if (score >= 50) {
      color = "yellow";
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

  info(`created all lighthouse badges! 🎈🎉🥳`);
} else {
  info("skipping badge generation, because there were no changes! 🎈🎉🥳");
}
