
/**
 * NewsApi class
 */
class NewsApi {
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
    const articles = data.articles;
    // map articles
    return this.articleMapper(articles);
  }

  /**
   * Maparticles
   * @param {Array} articles
   * @return {Array}
   */
  static articleMapper(articles) {
    return articles.map( (article) =>{
      return {
        headline: article.title || ' ',
        link: article.url || ' ',
        publishedAt: container.moment(article.publishedAt).toISOString() || ' ',
        source: 'newsapi',
      };
    });
  }

  /**
   * constract conditions to Query NewsApi api and return a list of Articles
   * @param {Integer} limit
   * @param {String} query
   * @param {String} page
   * @return {Array}
   */
  static query(limit = 5, query, page = 1) {
    // constract query string
    let constrainString = `&apiKey=${container.config.newsApi_key}&pageSize=${limit}&page=${page}`;
    if (query) constrainString += `&q=${query}`;

    // config query base url
    const baseUrl = (query) ? container.config.newsApi_search : container.config.newsApi_base;

    return this.getArticles(baseUrl, constrainString);
  }
}

module.exports = NewsApi;
