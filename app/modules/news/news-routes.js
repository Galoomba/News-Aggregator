const newsController = container.newsController;

module.exports = (router) => {
  /**
   * List all newss.
   */
  router.get('/', newsController.fetch);

  return router;
};
