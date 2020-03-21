const newsController = container.newsController;

module.exports = (router) => {
  /**
   * List all newss.
   */
  router.get('/', newsController.all);

  /**
   * Finde news by id.
   */
  router.get('/:id', newsController.find);

  /**
   * Paginate newss.
   */
  router.get('/paginate/:page/:perPage', newsController.paginate);

  /**
   * Find all newss by the given conditions.
   */
  router.post('/filter', newsController.findBy);

  /**
   * Paginate newss by the given conditions.
   */
  router.post('/filter/:page/:perPage', newsController.paginateBy);

  /**
   * Create new news.
   */
  router.post('/', container.newsValidationRules.apply('insert'), newsController.insert);

  /**
   * Update the given news.
   */
  router.patch('/', container.newsValidationRules.apply('update'), newsController.update);

  /**
   * Delete the given news.
   */
  router.delete('/:id', newsController.delete);

  return router;
};
