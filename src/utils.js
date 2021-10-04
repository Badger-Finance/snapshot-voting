const fs = require("fs");

const readJson = (file) => {
  const rawdata = fs.readFileSync(file);
  return JSON.parse(rawdata);
};

module.exports = { readJson };
