const objection = container.objection;

/**
 * Model class
 */
class Model extends objection {
  /**
   * Parse dates before insert.
   *
   * @param   {object}  context
   *
   * @return  {void}
   */
  $beforeInsert(context) {
    // eslint-disable-next-line no-undef
    return Promise.resolve(super.$beforeInsert(context)).then(() => {
      this.created_at = container.moment().format('YYYY-MM-DD HH:mm:ss');

      if (this.date) this.date = container.moment(this.date).format('YYYY-MM-DD HH:mm:ss');
      if (this.due_date) this.due_date = container.moment(this.due_date).format('YYYY-MM-DD');
      if (this.time_log) this.time_log = container.moment(this.time_log).format('YYYY-MM-DD HH:mm:ss');
      if (this.start_date) this.start_date = container.moment(this.start_date).format('YYYY-MM-DD HH:mm:ss');
      if (this.end_date) this.end_date = container.moment(this.end_date).format('YYYY-MM-DD HH:mm:ss');
    });
  }

  /**
   * Parse dates before update.
   *
   * @param   {object}  queryOptions
   * @param   {object}  context
   *
   * @return  {void}
   */
  $beforeUpdate(queryOptions, context) {
    // eslint-disable-next-line no-undef
    return Promise.resolve(super.$beforeUpdate(queryOptions, context)).then(() => {
      this.created_at = container.moment(this.created_at).format('YYYY-MM-DD HH:mm:ss');
      this.updated_at = container.moment().format('YYYY-MM-DD HH:mm:ss');

      if (this.date) this.date = container.moment(this.date).format('YYYY-MM-DD HH:mm:ss');
      if (this.due_date) this.due_date = container.moment(this.due_date).format('YYYY-MM-DD');
      if (this.time_log) this.time_log = container.moment(this.time_log).format('YYYY-MM-DD HH:mm:ss');
      if (this.start_date) this.start_date = container.moment(this.start_date).format('YYYY-MM-DD HH:mm:ss');
      if (this.end_date) this.end_date = container.moment(this.end_date).format('YYYY-MM-DD HH:mm:ss');
    });
  }
}

module.exports = Model;
