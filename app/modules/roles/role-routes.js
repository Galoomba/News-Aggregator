const roleController = container.roleController;

module.exports = (router) => {
  /**
   * List all roles.
   */
  router.get('/', roleController.all);

  /**
   * Finde role by id.
   */
  router.get('/:id', roleController.find);

  /**
   * Paginate roles.
   */
  router.get('/paginate/:page/:perPage', roleController.paginate);

  /**
   * Create new role.
   */
  router.post('/', roleController.insert);

  /**
   * Delete the given role.
   */
  router.delete('/:id', roleController.delete);

  return router;
};
