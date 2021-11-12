const express = require('express');

const sessionRouter = require('./session');
const usersRouter = require('./users');
const notebooksRouter = require('./notebooks');
const notesRouter = require('./notes');
const searchRouter = require('./search');

const router = express.Router();

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/notebooks', notebooksRouter);
router.use('/notes', notesRouter);
router.use('/search', searchRouter);

module.exports = router;
