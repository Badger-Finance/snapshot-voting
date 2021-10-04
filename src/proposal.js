const assert = require("assert/strict");
const fs = require("fs");
const path = require("path");

const { VOTES_DIR } = require("./constants");
const { getSpace, getProposal } = require("./snapshot");
const { readJson } = require("./utils");

const getProposalVotes = async (proposalId) => {
  const space = await getSpace(proposalId);
  const voteFile = path.join(VOTES_DIR, space, `${proposalId}.json`);

  if (fs.existsSync(voteFile)) {
    const data = readJson(voteFile);
    assert.equal(data.proposal, proposalId, "proposalId mismatch");
    return data.choice;
  } else {
    throw new Error(`Voting file doesn't exist: ${voteFile}`);
  }
};

const printProposalVotes = async (proposalId, voteWeights) => {
  const data = await getProposal(proposalId);
  const totalWeight = Object.values(voteWeights).reduce((a, b) => a + b, 0);

  votes = {};
  for (const choiceIx of Object.keys(voteWeights)) {
    const votePercent = (100 * voteWeights[choiceIx]) / totalWeight;
    votes[data.choices[choiceIx - 1]] = `${votePercent.toFixed(2)}%`; // Snapshot vote payload starts from 1
  }
  console.log(data);
  console.log("------Votes------");
  console.log(votes);
};

module.exports = { getProposalVotes, printProposalVotes };
