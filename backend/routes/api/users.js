const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const editProfileError = (message) => {
  const err = new Error(message);
  err.status = 401;
  err.title = 'Edit failed';
  err.errors = [message];
  return err;
};

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.')
    .custom((value) => {
      return User.findOne({ where: { email: value } }).then((user) => {
        if (user) {
          return Promise.reject(
            'The provided Email Address is already in use by another account'
          );
        }
      });
    }),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.')
    .custom((value) => {
      return User.findOne({ where: { username: value } }).then((user) => {
        if (user) {
          return Promise.reject(
            'The provided username is already in use by another account'
          );
        }
      });
    }),
  check('username').not().isEmail().withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors,
];

const validateProfileEdit = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username').not().isEmail().withMessage('Username cannot be an email.'),
  handleValidationErrors,
];

router.post(
  '/',
  validateSignup,
  asyncHandler(async (req, res, next) => {
    const { email, password, username } = req.body;
    const newUser = await User.signup({ email, username, password });

    await setTokenCookie(res, newUser);

    return res.json({ newUser });
  })
);

router.patch(
  '/:id(\\d+)',
  validateProfileEdit,
  asyncHandler(async (req, res, next) => {
    const { username, email } = req.body;
    const userId = parseInt(req.params.id, 10);
    const userToEdit = await User.findByPk(userId);
    if (userToEdit) {
      const usernameCheck = await User.findOne({ where: { username } });
      console.log(usernameCheck);
      if (usernameCheck && usernameCheck.id !== userToEdit.id) {
        return next(
          editProfileError(
            'The provided username is already in use by another account'
          )
        );
      }
      const emailCheck = await User.findOne({ where: { email } });
      if (emailCheck && emailCheck.id !== userToEdit.id) {
        return next(
          editProfileError(
            'The provided Email Address is already in use by another account'
          )
        );
      }
    }
    const userData = { username, email };
    await userToEdit.update(userData);
    return res.json(userToEdit);
  })
);

module.exports = router;
