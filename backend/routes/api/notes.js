const express = require('express');
const asyncHandler = require('express-async-handler');

const { Note } = require('../../db/models');
const { restoreUser } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const fetchNotesError = (message) => {
  const err = new Error(message);
  err.status = 401;
  err.title = 'Note fetch failed';
  err.errors = [message];
  return err;
};

router.get(
  '/',
  restoreUser,
  asyncHandler(async (req, res, next) => {
    const { user } = req;
    if (!user) {
      return next(fetchNotesError('Must be logged in to get note(s)'));
    }
    const notes = await Note.findAll({
      where: { userId: +user.dataValues.id },
    });
    return res.json({ notes });
  })
);

router.get(
  '/:id(\\d+)',
  restoreUser,
  asyncHandler(async (req, res, next) => {
    const { user } = req;
    const noteId = parseInt(req.params.id, 10);
    if (!user) {
      return next(fetchNotesError('Must be logged in to get note(s)'));
    }
    const note = await Note.findByPk(noteId);
    if (+note.userId !== +user.dataValues.id) {
      return next(fetchNotesError('You do not have access to this note'));
    }
    return res.json({ note });
  })
);

module.exports = router;
