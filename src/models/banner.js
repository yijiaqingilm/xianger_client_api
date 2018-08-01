/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('banner', {
    bannerId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    img: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'banner'
  });
};
