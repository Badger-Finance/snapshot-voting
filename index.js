const vote = async () => {
  const {Wallet, Contract} = require("ethers")

  // Pk is empty, no worries
  PRIVATE_KEY = process.env.PRIVATE_KEY || "511551aa8d8975bdd308282dedb7aca2a6f0cfcd919ba844b94eca7addceae9f"
  const wallet = new Wallet(PRIVATE_KEY)
  const snapshot = require('@snapshot-labs/snapshot.js')

  const client = new snapshot.Client("https://hub.snapshot.org/")

  client.vote(wallet, await wallet.getAddress(), "cvx.eth", {proposal: 18, choice: true, metadata: {}})
}

vote()