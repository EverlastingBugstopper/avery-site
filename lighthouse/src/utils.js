const INDENT = "  ";
const LINE_ITEM = "- ";
const NEWLINE = "\n";
const path = require("path");
const ROOT_DIR = process.cwd();
const LIGHTHOUSE_DIR = path.join(ROOT_DIR, "lighthouse");

const info = (message) => {
  process.stderr.write(`${message}\n`);
};

const error = (message, causes) => {
  let result;
  if (causes && causes.length > 0) {
    result = `${INDENT}${message}:${NEWLINE}${INDENT}${INDENT}${LINE_ITEM}${causes.join(
      `${NEWLINE}${INDENT}${INDENT}${LINE_ITEM}`
    )}`;
  } else if (message) {
    result = message;
  } else {
    result = "an unknown error occurred";
  }
  return new Error(result);
};

const errorWithCauses = (message, causes) => {
  return `${message}:${NEWLINE}${INDENT}${INDENT}${INDENT}${LINE_ITEM}${causes.join(
    `${NEWLINE}${INDENT}${INDENT}${INDENT}${LINE_ITEM}`
  )}`;
};

const displayFile = (fullPath) => {
  return fullPath.replace(ROOT_DIR, "");
};

const setActionOutput = (name, value) => {
  process.stdout.write(
    `::set-output name=${name}::${singleLineInBash(value)}\n`
  );
};

const singleLineInBash = (input) => {
  let result = replaceString("%", "%25", input);
  result = replaceString("\n", "%0A", result);
  result = replaceString("\r", "%0D", result);
  return result;
};

const replaceString = (oldSubstring, replaceSubstring, fullString) => {
  return fullString.split(oldSubstring).join(replaceSubstring);
};

module.exports = {
  LIGHTHOUSE_DIR,
  errorWithCauses,
  error,
  info,
  displayFile,
  setActionOutput,
};
