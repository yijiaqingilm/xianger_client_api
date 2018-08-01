/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('order_goods_items', {
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
      type: DataTypes.STRING(11),
      allowNull: true
    },
    count: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '1'
    },
    orderId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'order',
        key: 'orderId'
      }
    },
    oprice: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: '0.00'
    }
  }, {
    tableName: 'order_goods_items'
  });
};
