/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('combo_goods', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    comboId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'combo',
        key: 'comboId'
      }
    },
    goodsId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'goods',
        key: 'goodsId'
      }
    },
    count: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '1'
    }
  }, {
    tableName: 'combo_goods'
  });
};
