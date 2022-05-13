const INDENT = "  ";
const LINE_ITEM = "- ";
const NEWLINE = "\n";
const path = require("path");
const ROOT_DIR = process.cwd()
const LIGHTHOUSE_DIR = path.join(ROOT_DIR, "lighthouse");

const info = (message) => {
  process.stderr.write(`${message}\n`)
}

const error = (message, causes) => {
  let result;
  if (causes && causes.length > 0) {
    result =
      `${INDENT}${message}:${NEWLINE}${INDENT}${INDENT}${LINE_ITEM}${causes.join(
        `${NEWLINE}${INDENT}${INDENT}${LINE_ITEM}`
      )}`
    ;
  } else if (message) {
    result = message;
  } else {
    result = "an unknown error occurred";
  }
  return new Error(result)
};

const errorWithCauses = (message, causes) => {
  return `${message}:${NEWLINE}${INDENT}${INDENT}${INDENT}${LINE_ITEM}${causes.join(
    `${NEWLINE}${INDENT}${INDENT}${INDENT}${LINE_ITEM}`
  )}`;
};


const displayFile = (fullPath) => {
  return fullPath.replace(ROOT_DIR, "");
};

module.exports = {
  LIGHTHOUSE_DIR,
  errorWithCauses,
  error,
  info,
  displayFile,
};
