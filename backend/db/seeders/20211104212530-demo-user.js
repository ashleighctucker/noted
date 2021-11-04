'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          email: 'demo@treemail.com',
          username: 'demo',
          hashedPassword: bcrypt.hashSync('password'),
        },
        {
          email: faker.internet.email(),
          username: 'fakeOne',
          hashedPassword: bcrypt.hashSync(faker.internet.password()),
        },
        {
          email: faker.internet.email(),
          username: 'fakeTwo',
          hashedPassword: bcrypt.hashSync(faker.internet.password()),
        },
      ],

      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      'Users',
      {
        username: { [Op.in]: ['demo', 'fakeOne', 'fakeTwo'] },
      },
      {}
    );
  },
};
