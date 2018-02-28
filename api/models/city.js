var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var Schema = mongoose.Schema;

var citySchema = new Schema({
  name: String,
  active: Boolean
});

//validations:
citySchema.path('name').required(true, "name cannot be blank.");
citySchema.path('active').required(true, "active cannot be blank.");

autoIncrement.initialize(mongoose.connection);

//Autoincrement _id: [1,2,3,...]
citySchema.plugin(autoIncrement.plugin, {
  model: 'City',
  startAt: 1
});

module.exports = mongoose.model('City', citySchema);
