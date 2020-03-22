module.exports = (container) => {
  /**
   * Register read only dependencies.
   */
  container.constant('glob', require('glob'));
  container.constant('repository', require('./repository'));
  container.constant('controller', require('./controller'));
  container.constant('config', require('../config/app'));
  container.constant('moduleConfig', require('../config/module-config'));
  container.constant('mysql', require('mysql'));
  container.constant('knex', require('../config/db').knex);
  container.constant('objection', require('../config/db').Model);
  container.constant('Model', require('./model'));
  container.constant('Mapper', require('./mapper'));
  container.constant('transaction', require('../config/db').transaction);
  container.constant('util', require('util'));
  container.constant('sprintf', require('sprintf-js').sprintf);
  container.constant('noCase', require('no-case'));
  container.constant('moment', require('moment'));
  container.constant('logger', require('../helpers/logger'));
  container.constant('asyncWrapper', require('../config/exception-handler').asyncWrapper);
  container.constant('joi', require('@hapi/joi'));
  container.constant('jwt', require('jsonwebtoken'));
  container.constant('axios', require('axios'));
  const REDIS_HOST = (typeof global.it === 'function') ? `${process.env.REDIS_TEST_HOST}:${process.env.REDIS_TEST_PORT}` : `${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`;
  container.constant('redis', require('async-redis').createClient(`redis://${REDIS_HOST}`));

  /**
   * Register object dependencies.
   */
  container.factory('authStrategy', function(container) {
    let Strategy;

    if (container.config.auth_strategy === 'local') Strategy = require('../auth/strategies/local');
    else Strategy = require('../auth/strategies/external ');

    return new Strategy();
  });
  container.service('validator', require('../validator'));
  container.service('errorHandlers', require('../helpers/error-handler'));
  container.service('auth', require('../auth'), 'authStrategy');
};
