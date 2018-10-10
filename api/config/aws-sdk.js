const aws = require('aws-sdk');

const config = require('./index');

const s3 = new aws.S3({
  endpoint: new aws.Endpoint(config.SPACES_ENDPOINT),
  accessKeyId: config.SPACES_ACCESS_KEY,
  secretAccessKey: config.SPACES_SECRET_KEY,
});

module.exports = { s3 };
