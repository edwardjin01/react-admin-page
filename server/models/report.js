const report = (sequelize, DataTypes) => {
  const Report = sequelize.define('report', {
    title: {
      type: DataTypes.STRING
    },
    thumbnailUri: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT
    },
    reportUri: {
      type: DataTypes.STRING
    },
    postTime: {
      type: DataTypes.DATE
    }
  });

  Report.associate = models => {
    Report.belongsToMany(models.Token, { through: models.ReportToken });
    Report.belongsTo(models.User);
  };

  return Report;
};

module.exports =  report;
