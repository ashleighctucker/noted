'use strict';

const { User } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let notebooks = [
      {
        title: 'My To-Do Lists',
      },
      {
        title: 'Groceries',
        photoUrl:
          'https://images.unsplash.com/photo-1609780447631-05b93e5a88ea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
      },
      {
        title: 'Random Notes',
      },
      {
        title: 'My Projects',
        photoUrl:
          'https://images.unsplash.com/photo-1620325867502-221cfb5faa5f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2057&q=80',
      },
    ];

    function createNotebooks(usersEnd, usersStart, notebooks) {
      let result = [];

      for (let j = usersStart; j < usersEnd; j++) {
        for (let i = 0; i < notebooks.length; i++) {
          let currentNotbook = { ...notebooks[i] };
          currentNotbook['userId'] = j;
          result.push(currentNotbook);
        }
      }
      return result;
    }

    const numUsers = await User.count();

    let notebooksArray = createNotebooks(numUsers, 1, notebooks);

    return queryInterface.bulkInsert('Notebooks', notebooksArray, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Notebooks', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
