var waterfall = require('async-waterfall');
var async = require('async');
var Busboy = require('busboy');
var parseString = require('xml2js').parseString;
var fs = require('fs');
var currentTimeLapsed = new Date();

module.exports = {

  getWaterfall: function () {
    return waterfall;
  },

  getAsync: function() {
    return async;
  },

  getBusboy: function() {
    return Busboy;
  },

  getFileExtension: function(filename) {
    var ext = filename.split('.');
    return ext[ext.length - 1];
  },

  getXmlParse: function() {
    return parseString;
  },

  getFs: function() {
    return fs;
  },

  getDateHour: function(theDate) {
    var date = new Date(theDate);
    return date.getHours();
  },

  addHour: function(theDate, theHoursAdded) {
    theDate.setTime(theDate.getTime() + (theHoursAdded * 60 * 60 * 1000));
    return theDate;
  },

  getCurrentTimeLapsed: function() {
    return currentTimeLapsed;
  },

  getHoursDifferenceBetweenDates: function(date1, date2) {
    return Math.abs(date1 - date2) / 36e5;
  }
};
