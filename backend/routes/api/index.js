const express = require('express');
const asyncHandler = require('express-async-handler');

const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require('../../utils/auth.js');
const { User } = require('../../db/models');

const router = express.Router();

router.post('/test', (req, res) => {
  return res.json({ requestBody: req.body });
});

//test set token cookie method
router.get(
  '/set-token-cookie',
  asyncHandler(async (req, res) => {
    const user = await User.findOne({
      where: {
        username: 'demo',
      },
    });
    setTokenCookie(res, user);
    return res.json({ user });
  })
);

//test restore user func
router.get('/restore-user', restoreUser, (req, res) => {
  return res.json(req.user);
});

//test require auth
router.get('/require-auth', requireAuth, (req, res) => {
  return res.json(req.user);
});

module.exports = router;
