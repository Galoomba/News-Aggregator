const Controller = container.controller;

/**
 * NewsController Controller
 */
class NewsController extends Controller {
  /**
   * Specify methods that will not be checked
   * for login.
   *
   * @return  {array}
   */
  static skipLoginCheck = [];

  /**
   * Specify methods that will not be checked
   * for permissions.
   *
   * @return  {array}
   */
  static skipPermissionCheck = [];

  /**
   * Init new object
   *
   * @param   {object}  repository
   *
   * @return  {void}
   */
  constructor(repository) {
    super(repository);
  }

  /**
   * Fetch all records from the repo.
   *
   * @param   {object}  req
   * @param   {object}  res
   *
   * @return  {array}
   */
  async fetch(req, res) {
    return res.json(await this.repo.fetch(req.query.pageSize, req.query.query, req.query.page, req.query.sort));
  }
}

module.exports = NewsController;
