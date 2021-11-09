'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Notes',
      [
        {
          userId: 1,
          notebookId: 1,
          title: 'Test note one',
          content: 'Test note one content',
        },
        {
          userId: 1,
          notebookId: 2,
          title: 'Test note two',
          content: 'Test note two content',
        },
        {
          userId: 1,
          notebookId: 1,
          title: 'Test note three',
          content: 'Test note three content',
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Notes', null, {});
  },
};
