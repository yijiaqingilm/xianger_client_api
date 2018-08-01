/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('company', {
    companyId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    mobile: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    concat: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    address_detail: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    address_mobile: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'company'
  });
};
