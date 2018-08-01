/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('order_combo_items', {
    comboId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    oprice: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: '0.00'
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: '0.00'
    },
    remark: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    orderId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'order',
        key: 'orderId'
      }
    },
    count: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '1'
    }
  }, {
    tableName: 'order_combo_items'
  });
};
