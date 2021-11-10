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
  asyncHandler(async (req, res, next) => {
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

router.get(
  '/:id(\\d+)',
  restoreUser,
  asyncHandler(async (req, res, next) => {
    const { user } = req;
    const notebookId = parseInt(req.params.id, 10);
    if (!user) {
      return next(fetchNotebookError('Must be logged in to get notebook(s)'));
    }
    const notebook = await Notebook.findByPk(notebookId);
    if (notebook.id !== +user.dataValues.id) {
      return next(
        fetchNotebookError('You do not have access to this notebook')
      );
    }
    return res.json(notebook);
  })
);

const validateNotebook = [
  check('title')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a title for your note')
    .isLength({ max: 256 })
    .withMessage('Title cannot be more than 256 characters long'),
  check('photoUrl')
    .isLength({ max: 256 })
    .withMessage('URL cannot be more than 256 characters long'),
  handleValidationErrors,
];

router.post(
  '/',
  restoreUser,
  validateNotebook,
  asyncHandler(async (req, res, next) => {
    const { title, photoUrl } = req.body;
    const { user } = req;
    if (!user) {
      return next(
        fetchNotebookError('You must be logged in to create a notebook')
      );
    }
    const newNotebook = await Notebook.create({
      userId: user.dataValues.id,
      title,
      photoUrl,
    });
    return res.json(newNotebook);
  })
);

router.put(
  '/:id(\\d+)',
  restoreUser,
  validateNotebook,
  asyncHandler(async (req, res, next) => {
    const { title, photoUrl } = req.body;
    const { user } = req;
    if (!user) {
      return next(
        fetchNotebookError('You must be logged in to edit a notebook')
      );
    }
    const notebookId = parseInt(req.params.id, 10);
    const notebookToUpdate = await Notebook.findByPk(notebookId);
    const notebook = { title, photoUrl, userId: user.dataValues.id };
    if (+notebookToUpdate.userId !== +user.dataValues.id) {
      return next(
        fetchNotebookError('You are not authorized to edit this notebook')
      );
    }
    await notebookToUpdate.update(notebook);
    return res.json(notebookToUpdate);
  })
);

module.exports = router;
