const path = require("path");
const fs = require("fs");
const {
  info,
  error,
  errorWithCauses,
  displayFile,
  LIGHTHOUSE_DIR,
} = require("./utils.js");
const SCORES_PATH = path.join(LIGHTHOUSE_DIR, "scores.json");

const validateData = (data) => {
  const REQUIRED_SCORES = [
    "accessibility",
    "bestPractices",
    "performance",
    "seo",
  ];

  let missingScores = [];
  let invalidScores = [];
  let errors = [];

  for (const name of REQUIRED_SCORES) {
    // make sure we have all the scores that we need
    const score = data[name];
    if (typeof score !== "number") {
      missingScores.push(name);
    } else if (score > 100 || score < 0) {
      invalidScores.push(name);
    }
  }

  // now that we know what we are missing, let's surface those as errors before we continue
  if (missingScores.length > 0) {
    errors.push(
      errorWithCauses(
        `the 'data' object in '${displayFile(
          SCORES_PATH
        )}' is missing the following number properties (they must be between 0 and 100)`,
        missingScores
      )
    );
  }

  if (invalidScores.length > 0) {
    errors.push(
      errorWithCauses(
        `these scores are invalid, they must be between 0 and 100`,
        invalidScores
      )
    );
  }

  if (errors.length > 0) {
    throw error(
      "these errors were encountered while preparing the template substitution",
      errors
    );
  }

  return data;
};

const updateScoresJSONFromReport = () => {
  const reportPath = path.join(LIGHTHOUSE_DIR, "report.json");
  info(`reading lighthouse report from ${displayFile(reportPath)}...`);
  if (!fs.statSync(reportPath).isFile()) {
    throw error(`${reportPath} is not a file.`);
  }
  const reportContents = require(reportPath);
  info(`read lighthouse report ✅`);
  info("validating lighthouse report...");
  const scores = reportContents.data[0].scores;
  return updateScoresJSON(
    scores.accessibility,
    scores.bestPractices,
    scores.performance,
    scores.seo
  );
};

const updateScoresJSON = (accessibility, bestPractices, performance, seo) => {
  const data = validateData({ accessibility, bestPractices, performance, seo });
  info(`writing new scores to ${displayFile(SCORES_PATH)}...`);
  fs.writeFileSync(SCORES_PATH, JSON.stringify({ data }, null, 2));
  info(`updated ${displayFile(SCORES_PATH)} 🥳🎉🎈`);
  return data;
};

module.exports = {
  updateScoresJSONFromReport,
  validateData,
  updateScoresJSON,
};
