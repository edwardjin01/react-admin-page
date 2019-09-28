const articleToken = (sequelize, DataTypes) => {
  const ArticleToken = sequelize.define('articleToken');
  return ArticleToken;
};

module.exports =  articleToken;
