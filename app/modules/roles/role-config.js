module.exports = {
  'role': {
    'relations': {
      'all': '[permissions]',
      'find': '[permissions]',
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
      'update': {relate: true, unrelate: true, noDelete: true, noUpdate: ['permissions']},
    },
  },
};
