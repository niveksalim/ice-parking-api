/**
 * Cars.js
 *
 * @description :: Cars Model
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  schema: true,
  attributes: {
    brand: {
      type: 'String',
      index: true,
      required: true
    },
    licenseplate: {
      type: 'String',
      index: true,
      required: true
    },
    parkinglotid: {
      model: 'parkinglots'
    },
    parkingtime: {
      type: 'datetime',
      index: true,
      required: true
    }
  },
  beforeCreate: function (values, cb) {
    sails.models['cars'].count({'parkinglotid': values.parkinglotid}).exec(function (err, found) {
      if(err) {
        console.log('ERROR CREATING Cars', err);
        return cb('Something went wrong, unable to create Cars');
      }
      if(found > 23) {
        return cb('ERROR_MESSAGE: Parking lot ' + values.parkinglotid + ' is full');
      }
      console.log('found', found);
      cb();
    });
  }
};

