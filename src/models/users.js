/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userType: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    mobile: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    avatar: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    scope: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    balance: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: '0.00'
    },
    source: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    cardId: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    nickName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    openId: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'users'
  });
};
