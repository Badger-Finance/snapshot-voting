const { Client: OriginalClient } = require("@snapshot-labs/snapshot.js");
const { Wallet } = require("@ethersproject/wallet");

// TODO: Ideally should come from snapshot.js
const VERSION = "0.1.3";

class Client extends OriginalClient {
  constructor(address) {
    super(address);
  }

  async voteViaWallet(wallet, space, { proposal, choice, metadata = {} }) {
    try {
      const msg = {
        address: await wallet.getAddress(),
        msg: JSON.stringify({
          version: VERSION,
          timestamp: (Date.now() / 1e3).toFixed(),
          space,
          type: "vote",
          payload: { proposal, choice, metadata },
        }),
      };
      msg.sig = await wallet.signMessage(msg.msg);
      // console.log(msg);
      return await this.send(msg);
    } catch (e) {
      console.error(e);
    }
  }
}

const vote = async () => {
  // Pk is empty, no worries
  PRIVATE_KEY =
    process.env.PRIVATE_KEY ||
    "511551aa8d8975bdd308282dedb7aca2a6f0cfcd919ba844b94eca7addceae9f";
  const wallet = new Wallet(PRIVATE_KEY);

  const client = new Client();

  client.voteViaWallet(wallet, "cvx.eth", {
    proposal: 18,
    choice: true,
  });
};

vote();
