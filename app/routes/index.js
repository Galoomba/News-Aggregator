const logsRouter = require('./logs-router');
module.exports = (app, express) => {
  app.use('/api/users', container.userRoutes(new express.Router()));
  app.use('/api/news', container.newsRoutes(new express.Router()));

  /**
   * Register logs route
   */
  if (process.env.NODE_ENV != 'production') {
    app.use('/logs', logsRouter(new express.Router()));
  }
};
