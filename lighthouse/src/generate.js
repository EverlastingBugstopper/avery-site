const path = require("path");
const fs = require("fs");
const { makeBadge } = require("badge-maker");
const { LIGHTHOUSE_DIR, displayFile, info } = require("./utils.js");
const { updateScoresJSONFromReport } = require("./scores.js");

const generateBadges = () => {
  const scores = updateScoresJSONFromReport();
  const badges = [];
  for (const [camelCaseName, score] of Object.entries(scores)) {
    const name = camelCaseName.replace(/([A-Z])/g, " $1").toLowerCase();

    let color = "red";
    if (score >= 90) {
      color = "success";
    } else if (score >= 50) {
      color = "yellow";
    }
    const svg = makeBadge({
      label: name,
      message: `${score}%`,
      labelColor: "gray",
      color,
    });
    badges.push({ camelCaseName, name, score, svg, color });
  }
  return badges;
};

const generateComment = () => {
  const badges = generateBadges();
  let comment = "# Lighthouse Audit Results\n\n";
  comment += "| test | score |\n| --- | --- |\n";
  for (const { name, score } of badges) {
    comment += `| ${name} | ${score}% |\n`;
  }
  info("printing comment for GitHub PR...");
  process.stdout.write(comment);
};

const generateAndWriteBadges = () => {
  const badges = generateBadges();
  const BADGES_DIR = path.join(LIGHTHOUSE_DIR, "badges");
  try {
    fs.mkdirSync(BADGES_DIR);
  } catch (e) {
    info(`this is probably fine: ${e}`);
  }
  for (const { camelCaseName, name, score, svg } of badges) {
    const badgePath = path.join(BADGES_DIR, `${camelCaseName}.svg`);
    info(`creating '${name}' badge with a score of '${score}'...`);
    fs.writeFileSync(badgePath, svg);
    info(`created ${displayFile(badgePath)} ✅`);
  }

  info(`created all lighthouse badges! 🎈🎉🥳`);
};

module.exports = {
  generateAndWriteBadges,
  generateComment,
};
