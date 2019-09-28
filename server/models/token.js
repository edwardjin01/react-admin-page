const token = (sequelize, DataTypes) => {
  const Token = sequelize.define('token', {
    name: {
      type: DataTypes.STRING
    },
    sticker: {
      type: DataTypes.STRING
    },
    coingeckoTokenId: {
      type: DataTypes.STRING,
      unique: true
    }
  });

  Token.associate = models => {
    Token.belongsToMany(models.Video, { through: models.VideoToken });
    Token.belongsToMany(models.Report, { through: models.ReportToken });
    Token.belongsToMany(models.Article, { through: models.ArticleToken });
  };

  return Token;
};

module.exports =  token;
