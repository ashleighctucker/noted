const express = require('express');
const asyncHandler = require('express-async-handler');
const { Op } = require('sequelize');

const { Notebook } = require('../../db/models');
const { restoreUser } = require('../../utils/auth');

const router = express.Router();

const searchError = (message) => {
  const err = new Error(message);
  err.status = 401;
  err.title = 'Search failed';
  err.errors = [message];
  return err;
};

async function searchNotebooks(term, id) {
  const notebooks = await Notebook.findAll({
    where: {
      userId: id,
      title: { [Op.iLike]: `%${term}%` },
    },
  });
  return notebooks;
}

router.get(
  '/:searchTerm',
  restoreUser,
  asyncHandler(async (req, res) => {
    const searchData = req.params.searchTerm;
    const { user } = req;
    if (!user) {
      return next(searchError('Must be logged in to search'));
    }

    const notebooks = await searchNotebooks(searchData, user.dataValues.id);

    return res.json(notebooks);
  })
);

module.exports = router;
