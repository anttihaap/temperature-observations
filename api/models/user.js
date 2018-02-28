var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//temperature observation
var userSchema = new Schema({
    name: String,
    password: String
});

//validations:
userSchema.path('_id').required(true, "id cannot be blank.");
userSchema.path('name').required(true, "name cannot be blank.");

module.exports = mongoose.model('User', userSchema);