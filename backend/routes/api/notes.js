const express = require('express');
const asyncHandler = require('express-async-handler');

const { Note } = require('../../db/models');
const { restoreUser } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.get(
  '/',
  restoreUser,
  asyncHandler(async (req, res, next) => {
    const { user } = req;
    console.log(user);
    if (user) {
      const notes = await Note.findAll({
        where: { userId: +user.dataValues.id },
      });
      console.log(notes);
      return res.json({ notes });
    } else {
      const err = new Error('Must be logged in to get notes');
      err.status = 401;
      err.title = 'Note fetch failed';
      err.errors = ['Must be logged in to get notes'];
      return next(err);
    }
  })
);

module.exports = router;
