const multer = require('multer');
const multerS3 = require('multer-s3');
const randToken = require('rand-token');

const config = require('./index');
const { s3 } = require('./aws-sdk');

module.exports = (folder, acl, allowedTypes) => multer({
  storage: multerS3({
    s3,
    bucket: config.SPACES_BUCKET,
    acl,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata(req, file, callback) {
      callback(null, file);
    },
    key(req, file, callback) {
      callback(
        null,
        `${folder}/${randToken.generate(32)}.${file.mimetype.split('/')[1]}`,
      );
    },
  }),
  fileFilter(req, file, callback) {
    const typeArray = file.mimetype.split('/');
    callback(
      null,
      allowedTypes.includes(typeArray[0])
          || allowedTypes.includes(typeArray[1]),
    );
  },
});
