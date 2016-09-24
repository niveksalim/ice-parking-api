var chargePerHour = 1.20;
var discountPerHour = 0.10;
var discountHour = 3;

module.exports = {

  insertCarAsync: function(car) {
    return function(callback) {
      Cars.create(car).exec(function (err, insertedCar) {
        console.log('ERROR inserting car', err);
        console.log('SUCCESS inserting car', insertedCar || car);
        if(err) {
          callback(err);
        } else {
          callback(null);
        }
      });
    };
  },

  calculateValue: function(parkingHour) {
    var totalDiscount = 0.0;
    if(parkingHour > discountHour) {
      var hourDifferent = parkingHour - discountHour;
      totalDiscount = discountPerHour * hourDifferent;
    }
    var totalValue = parkingHour * chargePerHour;
    return (totalValue - totalDiscount);
  },

  getDiscountHour: function() {
    return discountHour;
  },

  getDiscountPerHour: function() {
    return discountPerHour;
  }
};
