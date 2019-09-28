const video = (sequelize, DataTypes) => {
  const Video = sequelize.define('video', {
    title: {
      type: DataTypes.STRING
    },
    thumbnailUri: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT
    },
    embededCode: {
      type: DataTypes.STRING
    },
    likedCount: {
      type: DataTypes.INTEGER
    },
    unlikedCount: {
      type: DataTypes.INTEGER
    },
    sharedCount: {
      type: DataTypes.INTEGER
    },
    postTime: {
      type: DataTypes.DATE
    }
  });

  Video.associate = models => {
    Video.belongsToMany(models.VideoCategory, { through: models.VideoVideoCategory });
    Video.belongsToMany(models.Token, { through: models.VideoToken });
    Video.belongsTo(models.User);
  };

  return Video;
};

module.exports =  video;
