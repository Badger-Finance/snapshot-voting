// Import required AWS SDK clients and commands for Node.js
const { GetSecretValueCommand } = require("@aws-sdk/client-secrets-manager");

const secretsClient = require("./secrets-client");

const getSecret = async (secretId, secretKey) => {
  let data;
  try {
    data = await secretsClient.send(
      new GetSecretValueCommand({ SecretId: secretId })
    );
  } catch (err) {
    console.error(err);
  }
  let secret;
  if ("SecretString" in data) {
    secret = data.SecretString;
  } else {
    // Create a buffer
    const buff = new Buffer(data.SecretBinary, "base64");
    secret = buff.toString("ascii");
  }
  return JSON.parse(secret)[secretKey];
};

module.exports = { getSecret };
