'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class meme extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.meme.belongsToMany(models.user,{through: 'bank'})
    }
  };
  meme.init({
    top_text: DataTypes.STRING,
    bottom_text: DataTypes.STRING,
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'meme',
  });
  return meme;
};