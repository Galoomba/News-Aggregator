// const sinon = require('sinon');
require('dotenv').config();
const expect = require('chai').expect;
const container = require('../../app/config/container');
const Model = container.reddit;
const apiResponseSample = {
  kind: 't3',
  data: {
    title: 'My dad with David Bowie in a vacation in Greece. 1988.',
    thumbnail: 'https://b.thumbs.redditmedia.com/PWB_--rJpKcMh-iwpoHgSgMS6Ldl-_GBLnwbALXZeas.jpg',
    permalink: '/r/OldSchoolCool/comments/eltj5q/my_dad_with_david_bowie_in_a_vacation_in_greece/',
    url: 'https://i.redd.it/wctoqn6mgk941.jpg',
    created: 1578523177,
    media: null,
    is_video: false,
  },
};


describe('Unit Test reddit model ', () => {
  it('should return array of 1 with property headline, link, source and publishAt ', async () => {
    const result = await Model.articleMapper([apiResponseSample]);
    expect(result).to.be.an('array').with.lengthOf(1);
    expect(result[0]).to.have.all.keys('headline', 'link', 'source', 'publishedAt');
  });

  it('should return array of 1 with property with sample title ', async () => {
    const result = await Model.articleMapper([apiResponseSample]);
    expect(result).to.be.an('array').with.lengthOf(1);
    expect(result[0]).to.have.property('headline', 'My dad with David Bowie in a vacation in Greece. 1988.');
  });

  it('should return array of 1 with link with sample url ', async () => {
    const result = await Model.articleMapper([apiResponseSample]);
    expect(result).to.be.an('array').with.lengthOf(1);
    expect(result[0]).to.have.property('link', 'https://i.redd.it/wctoqn6mgk941.jpg');
  });
});

