/**
 * 200 (OK) Response
 *
 * Usage:
 * return res.ok();
 * return res.ok(data, message);
 *
 * @param  {Object} data
 * @param  {Object} message
 */

module.exports = function sendOK (data, message) {

  // Get access to `req`, `res`, & `sails`
  var req = this.req;
  var res = this.res;
  var sails = req._sails;

  sails.log.silly('res.ok() :: Sending 200 ("OK") response');

  // Set status code
  res.status(200);

  return res.send({
    status: 'ok',
    message: message,
    data: data
  });

};
