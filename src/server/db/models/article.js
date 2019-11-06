module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    body: DataTypes.TEXT,
    url: DataTypes.STRING,
  }, {});
  Article.associate = (models) => {
    Article.belongsTo(models.Author);
    Article.belongsTo(models.Website);
  };
  return Article;
};
