const { SecretsManagerClient } = require("@aws-sdk/client-secrets-manager");
const { AssumeRoleCommand } = require("@aws-sdk/client-sts");

const { REGION, ASSUME_ROLE_ARN } = require("./constants");
const stsClient = require("./sts-client");

const getAssumeRoleCredentials = async (assumeRoleArn) => {
  const params = {
    RoleArn: assumeRoleArn,
    RoleSessionName: "AssumeRoleSession1",
    // DurationSeconds: 900,
  };
  try {
    const data = await stsClient.send(new AssumeRoleCommand(params));
    return {
      accessKeyId: data.Credentials.AccessKeyId,
      secretAccessKey: data.Credentials.SecretAccessKey,
      sessionToken: data.Credentials.SessionToken,
    };
  } catch (err) {
    console.log("Error", err);
  }
};

// TODO: Maybe generate on runtime
// Set the Secrets Manager Service Object
const secretsClient = new SecretsManagerClient({
  region: REGION,
  credentials: getAssumeRoleCredentials(ASSUME_ROLE_ARN),
});

module.exports = secretsClient;
