'use strict';
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define(
    'Note',
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      notebookId: {
        type: DataTypes.INTEGER,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
      },
    },
    {}
  );

  Note.associate = function (models) {
    Note.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return Note;
};