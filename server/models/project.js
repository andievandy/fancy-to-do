'use strict';
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    name: DataTypes.STRING,
    creatorUserId: DataTypes.INTEGER
  }, {});
  Project.associate = function(models) {
    Project.belongsTo(models.User, {
      as: 'Creator', 
      foreignKey: 'creatorUserId'
    });
    Project.belongsToMany(models.User, {through: models.ProjectUser});
  };
  return Project;
};