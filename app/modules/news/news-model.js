const Model = container.Model;

/**
 * NewsModel model
 */
class NewsModel extends Model {
  /**
   * Return table name for this model.
   *
   * @return  {string}
   */
  static tableName = 'news';
}

module.exports = NewsModel;
