const express = require('express');
const errorHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const multer = require('../config/multer');
const multerS3 = require('../config/multer-s3');
const authCtrl = require('../controllers/auth.controller');
const fileCtrl = require('../controllers/file.controller');
const userCtrl = require('../controllers/user.controller');

const router = express.Router();

const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      error: null,
      msg: 'Please login first to access our services',
      data: null,
    });
  }
  jwt.verify(token, req.app.get('secret'), (err, decodedToken) => {
    if (err) {
      return res.status(401).json({
        error: err,
        msg: 'Login timed out, please login again.',
        data: null,
      });
    }
    req.decodedToken = decodedToken;
    next();
  });
};

const isNotAuthenticated = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    next();
  } else {
    jwt.verify(token, req.app.get('secret'), (err, decodedToken) => {
      if (!err) {
        return res.status(403).json({
          error: err,
          msg: 'You are already logged in.',
          data: null,
        });
      }
      next();
    });
  }
};

const upload = (folder, allowedTypes) => (req, res, next) => multer(`${req.decodedToken.user.username}/${folder}`, allowedTypes).single(
  'file',
)(req, res, next);
const uploadS3 = (folder, acl, allowedTypes) => (req, res, next) => multerS3(
  `${req.decodedToken.user.username}/${folder}`,
  acl,
  allowedTypes,
).single('file')(req, res, next);

// -------------------------------Auth------------------------------------------
router.post('/auth/signup', isNotAuthenticated, errorHandler(authCtrl.signup));
router.post('/auth/login', isNotAuthenticated, errorHandler(authCtrl.login));
router.patch(
  '/auth/resendVerificationEmail',
  errorHandler(authCtrl.resendVerificationEmail),
);
router.patch(
  '/auth/verifyAccount/:verificationToken',
  errorHandler(authCtrl.verifyAccount),
);
router.patch(
  '/auth/forgotPassword',
  isNotAuthenticated,
  errorHandler(authCtrl.forgotPassword),
);
router.get(
  '/auth/checkResetPasswordToken/:resetPasswordToken',
  isNotAuthenticated,
  errorHandler(authCtrl.checkResetPasswordToken),
);
router.patch(
  '/auth/resetPassword/:userId/:resetPasswordToken',
  isNotAuthenticated,
  errorHandler(authCtrl.resetPassword),
);
router.patch(
  '/auth/changePassword',
  isAuthenticated,
  errorHandler(authCtrl.changePassword),
);

// ----------------------------------User-------------------------------------
router.patch(
  '/user/updateProfile',
  isAuthenticated,
  errorHandler(userCtrl.updateProfile),
);
router.patch(
  '/user/changeProfilePicture',
  isAuthenticated,
  upload('profilePictures', ['image']),
  errorHandler(userCtrl.changeProfilePicture),
);

// -----------------------------------File-------------------------------------
router.get(
  '/file/:parentFolder/:subFolder/:fileName',
  isAuthenticated,
  errorHandler(fileCtrl.getFile),
);

module.exports = router;
