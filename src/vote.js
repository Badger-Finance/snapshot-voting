const { Wallet } = require("@ethersproject/wallet");

const client = require("./client");
const { getSpace } = require("./snapshot");
const {
  CVX_VOTER_SECRET_ID,
  CVX_VOTER_SECRET_KEY,
} = require("./aws/constants");
const { getSecret } = require("./aws/utils");

const vote = async (proposalId, choices) => {
  const space = await getSpace(proposalId);

  const privateKey = await getSecret(CVX_VOTER_SECRET_ID, CVX_VOTER_SECRET_KEY);
  // const privateKey =
  //   "511551aa8d8975bdd308282dedb7aca2a6f0cfcd919ba844b94eca7addceae9f";
  const wallet = new Wallet(privateKey);

  client.voteViaWallet(wallet, space, {
    proposal: proposalId,
    choice: choices,
  });
};

module.exports = vote;
