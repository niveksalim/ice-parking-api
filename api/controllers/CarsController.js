/**
 * CarsController
 *
 * @description :: Server-side logic for managing cars
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var async = UtilService.getAsync();
var Busboy = UtilService.getBusboy();
var parseString = UtilService.getXmlParse();
var fs = UtilService.getFs();
var index = 0;
// create a queue object with concurrency 2
var q = async.queue(function(task, callback) {
  setTimeout(function() {
    console.log('done ' + task.name + ', ' + task.theIndex);
    callback();
  }, 5000);
}, 2);

module.exports = {
  /**
   * Create car model (bulk)
   * @param req
   * @param res
     */
  createCars: function(req, res) {
    req.file('cars').upload(function (err, uploadedFiles){
      console.log('POST result /api/v1/cars', uploadedFiles);
      console.log('POST err /api/v1/cars', err);
      if (err) {
        return res.missingParams('Something went wrong, unable to process the file');
      }
      if(uploadedFiles.length === 0) {
        return res.missingParams('Missing parameter: file with key \'cars\' OR no file attached');
      } else {
        var file = uploadedFiles[0];
        if(UtilService.getFileExtension(file.filename) !== 'xml') {
          return res.badRequest('Missing parameter: xml file expected');
        } else {
          fs.readFile(file.fd, 'utf8', function (err, data) {
            if (err) {
              return res.missingParams('Something went wrong, unable to read the file');
            }
            parseString(data, function (err, result) {
              if (err) {
                return res.missingParams('Something went wrong, unable to read the xml file');
              }
              if(result.cars && result.cars.car && result.cars.car.length > 0) {
                var listOfCallbacks = [];
                var listOfCars = [];
                result.cars.car.forEach(function(car) {
                  listOfCars.push(car.$);
                  listOfCallbacks.push(CarService.insertCarAsync(car.$));
                });
                async.waterfall(listOfCallbacks, function (err, result) {
                  if(err) {
                    console.log('CALLBACK err /api/v1/cars', err);
                    return res.serverError(err);
                  }
                  return res.ok(listOfCars, 'Successfully inserted cars');
                });
              } else {
                return res.missingParams('Invalid xml format');
              }
            });
          });
        }
      }
    });
  },

  createCars2: function(req, res) {
    console.log(' ');
    console.log(' ');
    console.log(' ');
    console.log('Handling request ----------- ', index);
    index++;
    console.log(' ');
    console.log(' ');
    console.log(' ');
    var theIndex = index;

// assign a callback
    q.drain = function() {
      console.log('all items have been processed', theIndex);
    };

// add some items to the queue
    q.push({name: 'foo', theIndex: theIndex}, function(err) {
      console.log('finished processing foo', theIndex);
    });
    q.push({name: 'bar', theIndex: theIndex}, function (err) {
      console.log('finished processing bar', theIndex);
    });

// add some items to the queue (batch-wise)
    q.push([{name: 'baz', theIndex: theIndex},{name: 'bay', theIndex: theIndex},{name: 'bax', theIndex: theIndex}], function(err) {
      console.log('finished processing item', theIndex);
    });

    return res.send({
      status: 'ok'
    });
  }
};

