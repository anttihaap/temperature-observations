var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var idvalidator = require('mongoose-id-validator');

//temperature observation
var tempObsSchema = new Schema({
  city_id: { type: Schema.Types.Number, ref: 'City' },
  temp: Number,
  date: Date
});

//validations:
tempObsSchema.path('city_id').required(true, "city_id cannot be blank.");
tempObsSchema.path('temp').required(true, "temp cannot be blank.");
tempObsSchema.path('date').required(true, "date cannot be blank.");
//used to validate that city_id refers to existing city.
tempObsSchema.plugin(idvalidator);

tempObsSchema.statics.findLatestByCityId = function(city_id) {
  return this.findOne({ 'city_id': city_id }).sort('-date');      
}

tempObsSchema.statics.findMaxPastDayByCityId = function(city_id) {
  var currDateSub24Hours = this.currDateSub24Hours();
  return this.findOne({ 'city_id': city_id }).where('date').gt(currDateSub24Hours).sort({ "temp": -1 });
}

tempObsSchema.statics.findMinPastDayByCityId = function(city_id) {
  var currDateSub24Hours = this.currDateSub24Hours();
  return this.findOne({ 'city_id': city_id }).where('date').gt(currDateSub24Hours).sort({ "temp": 1 });
}

tempObsSchema.statics.currDateSub24Hours = function() {
  var currDateSub24Hours = new Date();
  currDateSub24Hours.setHours(currDateSub24Hours.getHours() - 24);
  return currDateSub24Hours.toJSON();
}

module.exports = mongoose.model('TempObs', tempObsSchema);
