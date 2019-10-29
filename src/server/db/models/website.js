'use strict';
module.exports = (sequelize, DataTypes) => {
  const Website = sequelize.define('Website', {
    name: DataTypes.STRING
  }, {});
  Website.associate = function(models) {
    Website.hasMany(models.Article)
  };
  return Website;
};