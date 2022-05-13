const path = require("path");
const { actionsOutput, info, error, errorWithCauses, displayFile, LIGHTHOUSE_DIR } = require("./utils.js");
const SCORES_PATH = path.join(LIGHTHOUSE_DIR, "scores.json");

const validate = () => {
  const REQUIRED_SCORES = [
    "accessibility",
    "best_practices",
    "performance",
    "seo",
  ];

  let missingScores = [];
  let invalidScores = [];
  let errors = [];

  info("validating scores...");
  const SCORES_JSON = require(SCORES_PATH);
  const data = SCORES_JSON["data"];
  if (!data) {
    throw error(
      `${displayFile(
        SCORES_PATH
      )} is malformed, it must have a top-level 'data' property`
    );
  }
  info(`validated ${displayFile(SCORES_PATH)} ✅`);

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
        `The 'data' object in '${displayFile(
          SCORES_PATH
        )}' is missing the following number properties (they must be between 0 and 100)`,
        missingScores
      )
    );
  }

  if (invalidScores.length > 0) {
    errors.push(
      errorWithCauses(
        `These scores are invalid, they must be between 0 and 100`,
        invalidScores
      )
    );
  }

  if (errors.length > 0) {
    throw error(
      "These errors were encountered while preparing the template substitution",
      errors
    );
  }
  return data;
};

const update = (accessibility, best_practices, performance, seo) => {
  const fs = require("fs");
  const data = {
    accessibility,
    best_practices,
    performance,
    seo,
  };
  let existingScores = {};
  try {
    // this will fail if the file hasn't been created
    existingScores = validate();
    info("found existing scores...")
  } catch (_) {
    info("no existing scores...")
    // do nothing with the error
  }
  info("checking if the input differs from the existing scores...")
  const changed = (JSON.stringify(data) != JSON.stringify(existingScores));
  actionsOutput("changed", changed)
  if (changed) {
    info(`writing new scores to ${displayFile(SCORES_PATH)}...`)
    fs.writeFileSync(SCORES_PATH, JSON.stringify({ data }, null, 2));
    info(`updated ${displayFile(SCORES_PATH)} 🥳🎉🎈`)
  } else {
    info(`${displayFile(SCORES_PATH)} remains unchanged 🥳🎉🎈`)
  }

};

module.exports = {
  update,
  validate,
};
