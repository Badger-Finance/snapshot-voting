const { Client: BaseClient } = require("@snapshot-labs/snapshot.js");

const { SNAPSHOT_VERSION } = require("./constants");

class Client extends BaseClient {
  constructor(address) {
    super(address);
  }

  async voteViaWallet(wallet, space, { proposal, choice, metadata = {} }) {
    try {
      const msg = {
        address: await wallet.getAddress(),
        msg: JSON.stringify({
          version: SNAPSHOT_VERSION,
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

const client = new Client();

module.exports = client;
