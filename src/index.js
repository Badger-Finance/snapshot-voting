const { program } = require("commander");

const { getProposalVotes, printProposalVotes } = require("./proposal");
const vote = require("./vote");

const main = async () => {
  program.option("-v, --vote", "send votes to snapshot");
  program.option("-p, --proposal <id>", "id of proposal to vote for");

  program.parse(process.argv);

  const options = program.opts();
  const proposalId = options.proposal;
  const voteWeights = await getProposalVotes(proposalId);
  if (options.vote) {
    vote(proposalId, voteWeights);
  } else {
    printProposalVotes(proposalId, voteWeights);
  }
};

main();
