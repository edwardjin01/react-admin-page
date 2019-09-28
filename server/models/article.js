const article = (sequelize, DataTypes) => {
  const Article = sequelize.define('article', {
    title: {
      type: DataTypes.STRING
    },
    thumbnailUri: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT
    },
    imageUri: {
      type: DataTypes.STRING
    },
    likedCount: {
      type: DataTypes.INTEGER
    },
    sharedCount: {
      type: DataTypes.INTEGER
    },
    postTime: {
      type: DataTypes.DATE
    }
  });

  Article.associate = models => {
    Article.belongsToMany(models.Token, { through: models.ArticleToken });
    Article.belongsTo(models.User);
  };

  return Article;
};

module.exports =  article;
