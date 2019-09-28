const user = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    name: {
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.STRING
    },
    invitationCode: {
      type: DataTypes.STRING
    },
    paidStatus: {
      type: DataTypes.BOOLEAN
    },
    isAdmin: {
      type: DataTypes.BOOLEAN
    }
  });

  User.associate = models => {
    User.hasMany(models.Video, { onDelete: 'CASCADE' });
    User.hasMany(models.Report, { onDelete: 'CASCADE' });
    User.hasMany(models.Article, { onDelete: 'CASCADE' });
  };

  return User;
};

module.exports =  user;
