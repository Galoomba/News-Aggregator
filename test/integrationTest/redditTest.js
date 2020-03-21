// const sinon = require('sinon');
require('dotenv').config();
const expect = require('chai').expect;
const container = require('../../app/config/container');
const Model = container.reddit;


describe('Integration Test reddit model ', () => {
  it('should return array of 5 with request schema', async () => {
    const result = await Model.query();
    expect(result).to.be.an('array').with.lengthOf(5);
  });

  it('should return array of 1 with request schema', async () => {
    const result = await Model.query(1);
    expect(result).to.be.an('array').with.lengthOf(1);
  });

  it('should return array of 3 with request schema About bitcoin', async () => {
    const result = await Model.query(3, 'bitcoin');
    expect(result).to.be.an('array').with.lengthOf(3);
  });
});

