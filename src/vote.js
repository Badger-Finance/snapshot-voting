const { Wallet } = require("@ethersproject/wallet");

const client = require("./client");
const { getSecret } = require("./aws/utils");

const vote = async (proposalId, choices) => {
  privateKey = await getSecret("cvx/voter", "CVX_VOTER_KEY");
  // privateKey =
  //   "511551aa8d8975bdd308282dedb7aca2a6f0cfcd919ba844b94eca7addceae9f";
  const wallet = new Wallet(privateKey);

  client.voteViaWallet(wallet, "cvx.eth", {
    proposal: proposalId,
    choice: choices,
  });
};

module.exports = vote;