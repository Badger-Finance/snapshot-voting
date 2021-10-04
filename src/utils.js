const assert = require("assert/strict");
const fs = require("fs");
const path = require("path");

const { VOTES_DIR } = require("./constants");

const readJson = (file) => {
  const rawdata = fs.readFileSync(file);
  return JSON.parse(rawdata);
};

const getProposalVotes = (proposalId) => {
  const data = readJson(path.join(VOTES_DIR, `${proposalId}.json`));
  assert.equal(data.proposal, proposalId, "proposalId mismatch");
  return data.choice;
};

module.exports = { readJson, getProposalVotes };
