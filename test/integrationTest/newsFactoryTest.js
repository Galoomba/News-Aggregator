// const sinon = require('sinon');
require('dotenv').config();
const expect = require('chai').expect;
const container = require('../../app/config/container');
const Model = container.newsfactory;


describe('Integration Test newsfactory model ', () => {
  it('should return array of 10 with request schema', async () => {
    const result = await Model.getArticles(10, null, 1);
    expect(result).to.be.an('array').with.lengthOf(10);
    expect(result[0]).to.have.all.keys('headline', 'link', 'source', 'publishedAt');
  });

  it('should return array of 1 with request schema', async () => {
    const result = await Model.getArticles(1, 'bitcoin', 1);
    expect(result).to.be.an('array').with.lengthOf(1);
    expect(result[0]).to.have.all.keys('headline', 'link', 'source', 'publishedAt');
  });

  it('should return array of 11 with request schema About bitcoin', async () => {
    const result = await Model.getArticles(11, null, 1);
    expect(result).to.be.an('array').with.lengthOf(11);
    expect(result[0]).to.have.all.keys('headline', 'link', 'source', 'publishedAt');
  });
});

