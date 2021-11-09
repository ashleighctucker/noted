'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notebook = sequelize.define(
    'Notebook',
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      photoUrl: {
        type: DataTypes.STRING,
      },
    },
    {}
  );
  Notebook.associate = function (models) {
    Notebook.belongsTo(models.User, { foreignKey: 'userId' });
    Notebook.hasMany(models.Note, {
      foreignKey: 'notebookId',
      onDelete: 'cascade',
      hooks: true,
    });
  };
  return Notebook;
};
