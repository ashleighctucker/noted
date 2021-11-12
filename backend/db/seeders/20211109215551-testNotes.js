'use strict';

const { User, Notebook } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let notes = [
      {
        title: 'To-Do Today',
        content:
          'Finish the laundry, take the trash out, go to the bank, go shopping',
      },
      {
        title: 'Quick List',
        content: 'Butter, eggs, bread, sugar, milk',
      },
      {
        title: 'Random Ideas',
        content: 'Leave a dream journal here',
      },
      {
        title: 'Gift Ideas',
        content: 'Mom - scarf, Dad - wallet',
      },
      {
        title: 'Remember to pick up dry cleaning!',
        content: 'You dropped it off saturday 11/13',
      },
      {
        title: 'Random Note',
        content: 'Leave your ideas here',
      },
    ];

    async function createNotes(usersEnd, usersStart, notes) {
      console.log('here');
      let result = [];
      for (let j = usersStart; j < usersEnd; j++) {
        console.log('here', j);
        const usersNotebooks = await Notebook.findAll({ where: { userId: j } });
        // let usersNotebooks = await Notebook.findAll();
        console.log('here');
        console.log(usersNotebooks);
        for (let i = 0; i < notes.length; i++) {
          let currentNote = { ...notes[i] };
          currentNote['userId'] = j;
          let chosenNotebook = Math.floor(
            Math.random() * usersNotebooks.length
          );
          if (chosenNotebook === 0) {
            chosenNotebook = 1;
          }
          console.log(usersNotebooks);
          currentNote['noteboodId'] = usersNotebooks[chosenNotebook].id;
          result.push(currentNote);
        }
        return result;
      }
    }

    const numUsers = await User.count();
    console.log('here');

    let notesArray = createNotes(numUsers, 1, notes);

    return queryInterface.bulkInsert('Notes', notesArray, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Notes', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
