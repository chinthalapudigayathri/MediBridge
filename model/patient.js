//import mongo db library
const mongoose = require('mongoose');

//creating a schema in mongodb
const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  medicalHistory: [String],
  appointments: [{
    date: Date,
    doctor: String,
    notes: String
  }]
});

/*after schema is created, we need to create model from schema using
mongoose.model('ModelName', schema)
with this mongoose libbrary will automatically convert it into mongodb collection
we will use export keyword so that other files can also resuse this model object
*/

module.exports = mongoose.model('Patient', patientSchema);