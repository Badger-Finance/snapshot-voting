const path = require("path");

// TODO: Ideally should come from snapshot.js
const SNAPSHOT_VERSION = "0.1.3";
const SNAPSHOT_GRAPHQL_ENDPOINT = "https://hub.snapshot.org/graphql";

const VOTES_DIR = path.join(__dirname, "..", "votes");

module.exports = {
  SNAPSHOT_VERSION,
  SNAPSHOT_GRAPHQL_ENDPOINT,
  VOTES_DIR,
};
