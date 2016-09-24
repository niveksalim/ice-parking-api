/**
 * ParkinglotsController
 *
 * @description :: Server-side logic for managing parkinglots
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  findParkingLotCars: function(req, res) {
    if(!req.params.id) {
      return res.missingParams('Missing params: parking lot id');
    }
    var parkingLotId = req.params.id;
    Cars.find({'parkinglotid': parkingLotId}).exec(function(err, result) {
      if(err) {
        console.log('ERROR /api/v1/parkinglots/:id/cars/:t', err);
        return res.missingParams('Something went wrong, unable to retrieve the parking lots information');
      }
      console.log('RESPONSE /api/v1/parkinglots/:id/cars/:t', result);
      result.forEach(function(car) {

      });
      return res.ok(result, 'Parking lots found');
    });
  },

  calculateRevenue: function(req, res) {
    if(!req.params.t) {
      return res.missingParams('Missing params: the time params');
    }
    var t = req.params.t;
    var theTimeLapsed = UtilService.addHour(UtilService.getCurrentTimeLapsed(), t);
    Cars.find({}).exec(function(err, result) {
      if(err) {
        console.log('ERROR /api/v1/inventory/:t', err);
        return res.missingParams('Something went wrong, unable to retrieve the revenue');
      }
      console.log('RESPONSE /api/v1/inventory/:t', result);
      var theResponse = {
        totalAmountOfCars: 0,
        value: 0.0,
        discountInCents: 0
      };
      result.forEach(function(car) {
        theResponse.totalAmountOfCars++;
        var parkingHour = UtilService.getHoursDifferenceBetweenDates(theTimeLapsed, new Date(car.parkingtime));
        if(parkingHour > CarService.getDiscountHour()) {
          theResponse.discountInCents += CarService.getDiscountPerHour() * parkingHour;
        }
        theResponse.value += CarService.calculateValue(parkingHour);
      });
      theResponse.discountInCents = Math.round(theResponse.discountInCents * 100) / 100;
      theResponse.value = Math.round(theResponse.value * 100) / 100;
      return res.ok(theResponse, 'Revenue has been successfully calculated');
    });
  }

};

