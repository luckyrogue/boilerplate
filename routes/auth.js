const express = require('express');
const router = express.Router();

const {
  signup,
  accountActivation,
  signin,
  forgotPassword,
  resetPassword
} = require('../controllers/auth');

const {
  userSignupValidator,
  userSigninValidator,
  forgotPasswordValidator,
  resetPasswordValidator
} = require('../validators/auth');
const { runValidation } = require('../validators');

router.post('/auth/signup', userSignupValidator, runValidation, signup);
router.post('/auth/account-activation', accountActivation);
router.post('/auth/signin', userSigninValidator, runValidation, signin);

// Forgot / Reset Password
router.put(
  '/auth/forgot-password',
  forgotPasswordValidator,
  runValidation,
  forgotPassword
);
router.put(
  '/auth/reset-password',
  resetPasswordValidator,
  runValidation,
  resetPassword
);

module.exports = router;
