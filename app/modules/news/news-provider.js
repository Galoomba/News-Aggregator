module.exports = (container) => {
  container.constant('newsModel', require('./news-model'));
  container.service('news', require('./news'), 'newsModel');
  container.service('newsRepository', require('./news-repository'), 'news');
  container.service('newsController', require('./news-controller'), 'newsRepository');
  container.constant('newsRoutes', require('./news-routes'));
  container.constant('newsValidationRules', require('./news-validation-rules'));
};
