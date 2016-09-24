/**
 * Missing Params Handler
 *
 * Usage:
 * return res.missingParams();
 * return res.missingParams(data);
 *
 * e.g.:
 * ```
 * return res.missingParams(
 *   'Missing params: cars'
 * );
 * ```
 */

module.exports = function missingParams(data) {

  // Get access to `req`, `res`, & `sails`
  var req = this.req;
  var res = this.res;
  var sails = req._sails;

  // Set status code
  // res.status(400);

  // Log error to console
  if (data !== undefined) {
    sails.log.verbose('Sending 400 ("Bad Request") response: \n',data);
  }
  else sails.log.verbose('Sending 400 ("Bad Request") response');

  return res.send({
    status: 'error',
    message: data
  });
};

