const { SecretsManagerClient } = require("@aws-sdk/client-secrets-manager");

const { AWS_REGION } = require("../constants");

// Set the AWS Region.
//Set the Secrets Manager Service Object
const secretsClient = new SecretsManagerClient({ region: AWS_REGION });

module.exports = { secretsClient };
