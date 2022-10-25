'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ans extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ans.init({
    answer: DataTypes.STRING,
    questionId: DataTypes.INTEGER,
    correct: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'ans',
  });
  return ans;
};