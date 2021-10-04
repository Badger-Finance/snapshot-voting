const { request, gql } = require("graphql-request");

const { SNAPSHOT_GRAPHQL_ENDPOINT } = require("./constants");

const queryProposal = async (proposalId) => {
  const query = gql`
    query Proposal {
      proposal(id: "${proposalId}") {
        id
        title
        body
        type
        choices
        start
        end
        snapshot
        state
        author
        space {
          id
          name
        }
      }
    }
  `;
  return await request(SNAPSHOT_GRAPHQL_ENDPOINT, query);
};

const printProposalVotes = async (proposalId, voteWeights) => {
  const data = await queryProposal(proposalId);
  const totalWeight = Object.values(voteWeights).reduce((a, b) => a + b, 0);

  votes = {};
  for (const choiceIx of Object.keys(voteWeights)) {
    const votePercent = (100 * voteWeights[choiceIx]) / totalWeight;
    votes[data.proposal.choices[choiceIx - 1]] = `${votePercent.toFixed(2)}%`; // Snapshot vote payload starts from 1
  }
  console.log(data);
  console.log("------Votes------")
  console.log(votes);
};

module.exports = { printProposalVotes };
