'use strict';
const { hashPassword } = require('../helpers/password');
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;
  
  class User extends Model {

  }

  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'email is required.'
        },
        notEmpty: {
          msg: 'email is required.'
        },
        isEmail: {
          msg: 'email is not valid.'
        },
        isUnique: (value, next) => {
          User.findOne({
            where: sequelize.where(sequelize.fn('lower', sequelize.col('email')), value)
          }).then(data => {
            if(data) {
              next('This E-mail has been registered.');
            } else {
              next();
            }
          }).catch(err => {
            next(err);
          })
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'password is required.'
        },
        notEmpty: {
          msg: 'password is required.'
        }
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeValidate: (user, options) => {
        user.email = user.email.toLowerCase();
      },
      beforeCreate: (user, options) => {
        user.password = hashPassword(user.password);
      },
      beforeUpdate: (user, options) => {
        user.password = hashPassword(user.password);
      }
    }
  });
  User.associate = function(models) {
    User.hasMany(models.Todo);
    User.hasMany(models.Project, {foreignKey: 'creatorUserId'});
    User.belongsToMany(models.Project, {through: models.ProjectUser});
  };
  return User;
};