const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    const newUser = await User.signup({ email, username, password });

    await setTokenCookie(res, newUser);

    return res.json({ newUser });
  })
);

module.exports = router;
