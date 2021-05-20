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
      models.meme.belongsTo(models.user)
    }
  };
  meme.init({
    userId: DataTypes.INTEGER,
    img_url: DataTypes.STRING,
    private: DataTypes.BOOLEAN,
    copied: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'meme',
  });
  return meme;
};