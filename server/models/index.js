const Sequelize =  require('sequelize');

const sequelize = new Sequelize(
  'testdb',
  'nexle-user',
  'postgres',
  {
    dialect: 'postgres',
    port: 5432
  },
);

const models = {
  User: sequelize.import('./user'),
  Video: sequelize.import('./video'),
  VideoCategory: sequelize.import('./videoCategory'),
  VideoVideoCategory: sequelize.import('./videoVideoCategory'),
  VideoToken: sequelize.import('./videoToken'),
  Token: sequelize.import('./token'),
  ReportToken: sequelize.import('./reportToken'),
  Report: sequelize.import('./report'),
  ArticleToken: sequelize.import('./articleToken'),
  Article: sequelize.import('./article')
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

exports.sequelize = sequelize;

module.exports = models;
