const fs = require("fs");
const path = require("path");

let generator = {
  getText: _getText,
};
function _getText(initObj) {
  // destructure initObj with default values if they are missing
  const {
    fileName = "standard",
    format = "json",
    folderName = "ascii",
  } = initObj;
  console.log("ascii get text");

  try {
    const data = fs.readFileSync(
      path.resolve(__dirname) +
        "/../data/" +
        folderName +
        "/" +
        fileName +
        "." +
        format,
      "utf8"
    );
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
  }
}

module.exports = generator;
