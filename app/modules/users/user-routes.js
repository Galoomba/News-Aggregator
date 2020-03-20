const userController = container.userController;

module.exports = (router) => {
  /**
   * Create new user.
   */
  router.post('/', userController.insert);

  /**
   * Delete the given user.
   */
  router.delete('/:id', userController.delete);

  /**
   * Login using the given credentials.
   */
  router.post('/login', container.userValidationRules.apply('login'), userController.login);

  return router;
};
