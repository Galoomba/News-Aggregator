const Repository = container.repository;

/**
 * NewsRepository repository
 */
class NewsRepository extends Repository {
  /**
   * Init new object
   *
   * @param   {object}  model
   *
   * @return  {void}
   */
  constructor(model) {
    super(model);
  }


  /**
   * retrive the fetched articles form the news factory
   * @param {Integer} pageSize
   * @param {String} query
   * @param {Integer} page
   * @param {String} sort
   * @return {Array}
   */
  async fetch(pageSize, query, page, sort) {
    return container.newsfactory.getArticles(pageSize, query, page, sort);
  }
}

module.exports = NewsRepository;
