
/**
 * NewsController Controller
 */
class NewsFactory {
  /**
   * Init new object
   *
   * @param   {object}  newsModels
   *
   * @return  {void}
   */
  constructor(...newsModels) {
    this.models = newsModels;
  }

  /**
   * Gather news from all the news Classes
   * @param {Integer} limit
   * @param {String} query
   * @param {String} page
   * @return {Array}
   */
  async getArticles(limit = 10, query, page = 1) {
    const articlesList = [];
    const numberOfNewsFromSite = this.toFixed(limit / this.models.length, 0);
    /**
     * split the number of records between news model
     */
    for (let i = 0; i < this.models.length; i++) {
      articlesList.push(...await this.models[i].query(numberOfNewsFromSite, query, page));
    }

    // Make sure that the number of articles will match the user selection
    if (limit > articlesList.length) articlesList.push(...await this.models[0].query(1, query, limit + 1));

    // sort articles list by publishAt date
    return articlesList.sort((a, b) => container.moment(b.publishedAt) - container.moment(a.publishedAt));
  }

  /**
   * Convert decimale to int without rounding
   * @param {Integer} num
   * @param {Integer} fixed
   * @return {Integer}
   */
  toFixed(num, fixed) {
    // eslint-disable-next-line no-useless-escape
    const re = new RegExp(`^-?\\d+(?:\.\\d{0,' ${ (fixed || -1) } '})?`);
    return Number(num.toString().match(re)[0]);
  }
}

module.exports = NewsFactory;
