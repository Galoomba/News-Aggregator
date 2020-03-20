module.exports = {
  'rules': {
    /**
     * Validation rules for insert method.
     */
    'insert': container.validator.register({
      email: container.validator.
          custom('unique', 'email', 'users').
          string().
          required().
          email(),
      password: container.validator.
          string().
          required(),
    }),

    /**
     * Validation rules for login method.
     */
    'login': container.validator.register({
      email: container.validator.
          string().
          required().
          email(),
      password: container.validator.
          string().
          required(),
    }),
  },
  'apply': (method) => {
    return module.exports.rules[method].validate();
  },
};
