/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('goods', {
    goodsId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    weight: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: '0.00'
    },
    catalogsId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'catalogs',
        key: 'catalogsId'
      }
    },
    oprice: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: '0.00'
    },
    status: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    img: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    desc: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'goods'
  });
};
