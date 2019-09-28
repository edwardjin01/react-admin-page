const videoCategory = (sequelize, DataTypes) => {
  const VideoCategory = sequelize.define('videoCategory', {
    name: {
      type: DataTypes.STRING
    }
  });

  VideoCategory.associate = models => {
    VideoCategory.belongsToMany(models.Video, { through: models.VideoVideoCategory });
  };

  return VideoCategory;
};

module.exports =  videoCategory;
