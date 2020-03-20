module.exports = {
  'user': {
    'relations': {
      'all': '[roles,lines]',
      'find': '[]',
      'findBy': '[]',
      'paginate': '[]',
      'paginateBy': '[]',
    },
    'allowedRelations': {
      'insert': '[]',
      'update': '[]',
    },
    'upsertOptions': {
      'insert': {relate: true, unrelate: true},
      'update': {relate: true, unrelate: true, noDelete: true, noUpdate: true},
    },
  },
};
