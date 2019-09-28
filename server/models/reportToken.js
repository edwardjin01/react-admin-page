const reportToken = (sequelize, DataTypes) => {
  const ReportToken = sequelize.define('reportToken');
  return ReportToken;
};

module.exports =  reportToken;
