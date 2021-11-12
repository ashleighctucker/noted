'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const password = bcrypt.hashSync('noted21', 10);

    let users = [
      {
        email: 'demo@treemail.com',
        username: 'demo',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: 'ash@noted.io',
        username: 'notedAsh',
        hashedPassword: password,
      },
      {
        email: faker.internet.email(),
        username: 'fakeOne',
        hashedPassword: password,
      },
    ];

    const usersNum = 15;

    for (let i = 3; i < usersNum; i++) {
      let nextUser = {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        hashedPassword: bcrypt.hashSync(`notedSeeder${i}`, 10),
      };
      users.push(nextUser);
    }

    return queryInterface.bulkInsert('Users', users, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
