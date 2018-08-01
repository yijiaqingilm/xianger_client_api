/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('order_combo_goods_items', {
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
    catalogsName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    count: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    comboId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'order_combo_items',
        key: 'comboId'
      }
    },
    oprice: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: '0.00'
    }
  }, {
    tableName: 'order_combo_goods_items'
  });
};
