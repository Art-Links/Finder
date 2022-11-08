'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Form extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Form.belongsTo(models.Item, {
        foreignKey: 'itemId'
      })
      Form.belongsTo(models.User, {
        foreignKey: 'userId'
      })
    }
  }
  Form.init({
    userId: DataTypes.INTEGER,
    itemId: DataTypes.INTEGER,
    accepted: DataTypes.BOOLEAN,
    answers: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Form',
    tableName: 'forms'
  });
  return Form;
};