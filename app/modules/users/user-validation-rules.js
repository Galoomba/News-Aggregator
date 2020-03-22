module.exports = {
  'rules': {
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
