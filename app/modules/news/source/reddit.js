
/**
 * Reddit class
 */
class Reddit {
  /**
   * Init new object
   *
   * @return  {void}
   */
  constructor() {
  }

  /**
   * Fetch data from reddit api
   * @param {String} baseUrl
   * @param {String} constrainString
   * @return {Array}
   */
  static async getArticles(baseUrl, constrainString) {
    const {data} = await container.axios.get(`${baseUrl}${constrainString}`);
    const articles = data.data.children;
    // map articles
    return this.articleMapper(articles);
  }

  /**
   * Maparticles
   * @param {Array} articles
   * @return {Array}
   */
  static articleMapper(articles) {
    return articles.map( ({data}) =>{
      return {
        headline: data.title || ' ',
        link: data.url || ' ',
        publishedAt: container.moment.unix(data.created).toISOString() || ' ',
        source: 'reddit',
      };
    });
  }

  /**
   * constract conditions to Query reddit api and return a list of Articles
   * @param {Integer} limit
   * @param {String} query
   * @param {String} page
   * @return {Array}
   */
  static query(limit = 5, query, page) {
    // constract query string
    let constrainString = `&limit=${limit}&count=${limit}`;
    if (query) constrainString += `&q=${query}`;
    /**
     * TODO modify that query to cache user query to map the cursor based paggination to page and page size
     */
    if (!Number.isInteger(page)) {
      if (page) constrainString += `&after=${page}`;
      if (page) constrainString += `&before=${page}`;
    }
    // config query base url
    const baseUrl = (query) ? container.config.reddit_search : container.config.reddit_base;

    return this.getArticles(baseUrl, constrainString);
  }
}

module.exports = Reddit;
