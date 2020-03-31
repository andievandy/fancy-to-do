'use strict';
const { hashPassword } = require('../helpers/password');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
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
        isUnique: (value, next) => {
          User.findOne({
            where: {
              email: value
            }
          }).then(data => {
            if(data) {
              next('This E-mail has been registered');
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
    hooks: {
      beforeCreate: (user, options) => {
        user.password = hashPassword(user.password);
      },
      beforeUpdate: (user, options) => {
        user.password = hashPassword(user.password);
      }
    }
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};