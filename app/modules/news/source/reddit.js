
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
   * @param {String} key
   * @return {Array}
   */
  static async getArticles(baseUrl, constrainString, key) {
    const {data} = await container.axios.get(`${baseUrl}${constrainString}`);
    const articles = data.data.children;
    container.redis.set(key, JSON.stringify({key: key, after: data.data.after, before: data.data.before}));
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
  static async query(limit = 5, query, page) {
    const key = `${page}/${limit}`;
    const prefKey = `${page - 1}/${limit}`;

    // constract query string
    let constrainString = `&limit=${limit}&count=${limit}`;
    if (query) constrainString += `&q=${query}`;
    // if pages > 1 try to retrive the cursor from the cache
    if (page > 1) {
      const cursor = await this.getCursorFromCache(prefKey);
      if (cursor && (Number(cursor.key.split('/')[0]) < page)) constrainString += `&after=${cursor.after}`;
      else if (cursor && (Number(cursor.key.split('/')[0]) > page)) constrainString += `&before=${cursor.before}`;
    }
    // config query base url
    const baseUrl = (query) ? container.config.reddit_search : container.config.reddit_base;
    return this.getArticles(baseUrl, constrainString, key);
  }

  /**
   * Retrive key from redis and parse it
   * @param {String} key
   */
  static async getCursorFromCache(key) {
    const result = JSON.parse(await container.redis.get(key));
    if (result.key && (result.after || result.before)) return result;
    else return undefined;
  }
}

module.exports = Reddit;
