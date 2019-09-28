const videoToken = (sequelize, DataTypes) => {
  const VideoToken = sequelize.define('videoToken');
  return VideoToken;
};

module.exports =  videoToken;
