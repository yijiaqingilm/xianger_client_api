/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('domain', {
    domainId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'domain'
  });
};
