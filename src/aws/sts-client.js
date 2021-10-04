const { STSClient } = require("@aws-sdk/client-sts");

const { REGION } = require("./constants");

// Create an Amazon STS service client object.
const stsClient = new STSClient({
  region: REGION,
});

module.exports = stsClient;

