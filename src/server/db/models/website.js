module.exports = (sequelize, DataTypes) => {
  const Website = sequelize.define('Website', { name: DataTypes.STRING }, {});
  Website.associate = (models) => {
    Website.hasMany(models.Article);
  };
  return Website;
};
