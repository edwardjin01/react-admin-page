const videoVideoCategory = (sequelize, DataTypes) => {
  const VideoVideoCategory = sequelize.define('videoVideoCategory');
  return VideoVideoCategory;
};

module.exports =  videoVideoCategory;
