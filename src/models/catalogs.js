/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('catalogs', {
    catalogsId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    remark: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'catalogs'
  });
};
