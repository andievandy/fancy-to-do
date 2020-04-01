'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;
  
  class Todo extends Model {
    getViewablePropertiesToUser() {
      let {id, title, description, status, due_date} = this;
      return {id, title, description, status, due_date};
    }
  }

  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "title is empty"
        },
        notEmpty: {
          msg: "title is empty"
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "description is empty"
        },
        notEmpty: {
          msg: "description is empty"
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "status is empty"
        },
        notEmpty: {
          msg: "status is empty"
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: "due_date is empty"
        },
        notEmpty: {
          msg: "due_date is empty"
        },
        isDate: {
          msg: "due_date must be in date format: YYYY-MM-DD"
        }
      }
    }
  }, { sequelize });
  Todo.associate = function(models) {
    Todo.belongsTo(models.User);
  };
  return Todo;
};