const config = require('../config');
const { s3 } = require('../config/aws-sdk');

module.exports.deleteFile = async key => s3
  .deleteObject({
    Bucket: config.SPACES_BUCKET,
    Key: key,
  })
  .promise();
