const fs = require('fs');
const moment = container.moment;
module.exports = (router) => {
  router.get('/:date?', (req, res, next) => {
    /**
     *  Set log File Name
     */
    const now = new Date();
    const fileName = (req.params.date) ? `${req.params.date}.log` : `${moment(now).format('YYYY')}-${moment(now).format('MM')}-${moment(now).format('DD')}.log`;
    const filePath = `${__dirname}/../../logs/${fileName}`;

    /**
     * Open Log file
     */
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        err.message = `ENOENT: NO log file for that date!`;
        return next(err);
      }
      res.send(`<pre>${data}</pre>`);
    });
  });

  return router;
};
