/**
 * ErrorHandler class.
 */
class ErrorHandler {
  /**
   * Throw 404 not found exception.
   *
   * @param   {string}  name
   *
   * @return  {void}
   */
  notFound(name = '') {
    const err = new Error(`${name} not found`);
    err.statusCode = 404;

    throw err;
  }

  /**
   * Throw 400 login failed exception.
   *
   * @return  {void}
   */
  loginFailed() {
    const err = new Error(`Wrong credentials`);
    err.statusCode = 400;

    throw err;
  }


  /**
   * Throw 400 login failed exception.
   * @param   {string} msg
   * @return  {void}
   */
  accessDenied(msg = '') {
    const err = new Error(`Access denied ${msg},Please contact administrator `);
    err.statusCode = 400;

    throw err;
  }

  /**
   * Throw 400 login failed exception.
   * @param   {string} msg
   * @return  {void}
   */
  userDontHasRole(msg = '') {
    const err = new Error(`Access denied user don't belong to a role`);
    err.statusCode = 403;

    throw err;
  }


  /**
   * Throw 400 login failed exception.
   * @param   {string} msg
   * @return  {void}
   */
  cantDoThatAction(msg = '') {
    const err = new Error(`You have no permission to do that action`);
    err.statusCode = 403;

    throw err;
  }

  /**
   * Throw 401 unauthorized exception.
   *
   * @return  {void}
   */
  unAuthorized() {
    const err = new Error(`Please login before any action`);
    err.statusCode = 401;

    throw err;
  }

  /**
   * Throw 403 no permissions exception.
   *
   * @return  {void}
   */
  noPermissions() {
    const err = new Error(`No permissions`);
    err.statusCode = 403;

    throw err;
  }

  /**
   * Throw 422 field already exists.
   *
   * @param   {string}  name
   *
   * @return  {void}
   */
  alreadyExists(name = '') {
    const err = new Error(`${name} already exists`);
    err.statusCode = 422;

    throw err;
  }

  /**
   * Throw 422 field already exists.
   *
   * @param   {string}  name
   *
   * @return  {void}
   */
  invalidInput(name = '') {
    const err = new Error(`${name} InvalidArgumentException`);
    err.message = ` InvalidArgumentException ${name}`;
    err.statusCode = 423;
    throw err;
  }
}

module.exports = ErrorHandler;
