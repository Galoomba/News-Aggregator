const permissionController = container.permissionController;

module.exports = (router) => {
  /**
   * List all permissions.
   */
  router.get('/', permissionController.all);

  /**
   * Finde permission by id.
   */
  router.get('/:id', permissionController.find);

  /**
   * Paginate permissions.
   */
  router.get('/paginate/:page/:perPage', permissionController.paginate);
  /**
   * Create new product.
   */
  router.post('/', permissionController.insert);

  return router;
};
