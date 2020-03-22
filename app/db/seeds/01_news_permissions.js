
exports.seed = async (knex, Promise) => {
  await knex('role_permission').del();
  await knex('permission').where('model', 'news').del();
  await knex('permission').insert([
    {
      name: 'fetch',
      key: 'fetch',
      model: 'news',
      created_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
      updated_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
    },
  ]);
};
