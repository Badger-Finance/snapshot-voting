const { request, gql } = require("graphql-request");

const { SNAPSHOT_GRAPHQL_ENDPOINT, PROPOSAL_ID } = require("./constants");

const query = gql`
  query Proposal {
    proposal(id: "${PROPOSAL_ID}") {
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

async function main() {
  const data = await request(SNAPSHOT_GRAPHQL_ENDPOINT, query);
  console.log(data);
}

main().catch((error) => console.error(error));
