// const sinon = require('sinon');
require('dotenv').config();
const expect = require('chai').expect;
const container = require('../../app/config/container');
const Model = container.newsApi;
const apiResponseSample = {
  author: 'Micaela Heck',
  title: 'How to Eat, With Mark Bittman and Dr. David L. Katz',
  description: 'Forget paleo, keto, and intermittent fasting—we’re getting to the ' +
    'truth of how you really should be eating this week with Mark ' +
    'Bittman and Dr. David L. Katz. Their latest book is called How to ' +
    'Eat: All Your Food and Diet Questions Answered, and in this ' +
    'episod…',
  url: 'https://lifehacker.com/how-to-eat-with-mark-bittman-and-dr-david-l-katz-1842132996',
  urlToImage: 'https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/ovtyo6fmenir1ueyiz0o.jpg',
  publishedAt: '2020-03-16T15:15:00Z',
};

describe('Unit Test newsApi model ', () => {
  it('should return array of 1 with property headline, link, source and publishAt ', async () => {
    const result = await Model.articleMapper([apiResponseSample]);
    expect(result).to.be.an('array').with.lengthOf(1);
    expect(result[0]).to.have.all.keys('headline', 'link', 'source', 'publishedAt');
  });

  it('should return array of 1 with property with sample title ', async () => {
    const result = await Model.articleMapper([apiResponseSample]);
    expect(result).to.be.an('array').with.lengthOf(1);
    expect(result[0]).to.have.property('headline', 'How to Eat, With Mark Bittman and Dr. David L. Katz');
  });

  it('should return array of 1 with link with sample url ', async () => {
    const result = await Model.articleMapper([apiResponseSample]);
    expect(result).to.be.an('array').with.lengthOf(1);
    expect(result[0]).to.have.property('link', 'https://lifehacker.com/how-to-eat-with-mark-bittman-and-dr-david-l-katz-1842132996');
  });
});

