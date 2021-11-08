const express = require('express');

const sessionRouter = require('./session');
const usersRouter = require('./users');
const notesRouter = require('./notes');

const router = express.Router();

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/notes', notesRouter);

module.exports = router;
