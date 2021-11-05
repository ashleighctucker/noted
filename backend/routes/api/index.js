const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');

const router = express.Router();

router.post('/test', (req, res) => {
  return res.json({ requestBody: req.body });
});

//test set token cookie func
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
module.exports = router;
