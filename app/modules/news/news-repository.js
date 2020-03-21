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
}

module.exports = NewsRepository;
