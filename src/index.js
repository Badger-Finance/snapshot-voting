const { program } = require("commander");

const { PROPOSAL_ID } = require("./constants");
const { printProposalVotes } = require("./proposal");
const { getProposalVotes } = require("./utils");
const vote = require("./vote");

const main = async () => {
  program.option("-v, --vote", "send votes to snapshot");

  program.parse(process.argv);

  const options = program.opts();
  const voteWeights = getProposalVotes(PROPOSAL_ID);
  if (options.vote) {
    vote(PROPOSAL_ID, voteWeights);
  } else {
    printProposalVotes(PROPOSAL_ID, voteWeights);
  }
};

main();
