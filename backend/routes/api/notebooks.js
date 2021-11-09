const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { Notebook } = require('../../db/models');
const { restoreUser } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const fetchNotebookError = (message) => {
  const err = new Error(message);
  err.status = 401;
  err.title = 'Notebook fetch failed';
  err.errors = [message];
  return err;
};

router.get(
  '/',
  restoreUser,
  asyncHandler(async (req, res) => {
    const { user } = req;
    if (!user) {
      return next(fetchNotebookError('Must be logged in to get notebook(s)'));
    }
    const notebooks = await Notebook.findAll({
      where: { userId: +user.dataValues.id },
    });
    return res.json(notebooks);
  })
);

module.exports = router;
