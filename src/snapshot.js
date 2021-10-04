const { request, gql } = require("graphql-request");
const { SNAPSHOT_GRAPHQL_ENDPOINT } = require("./constants");

const getSpace = async (proposalId) => {
  const query = gql`
    query Proposal {
      proposal(id: "${proposalId}") {
        space {
          id
        }
      }
    }
  `;
  const response = await request(SNAPSHOT_GRAPHQL_ENDPOINT, query);
  if (response?.proposal?.space) {
    return response.proposal.space.id;
  } else {
    throw new Error(`No space found for proposal ${proposalId}`);
  }
};

const getProposal = async (proposalId) => {
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
  const response = await request(SNAPSHOT_GRAPHQL_ENDPOINT, query);
  if (response.proposal) {
    return response.proposal;
  } else {
    throw new Error(`No proposal found for id ${proposalId}`);
  }
};

module.exports = { getSpace, getProposal };
