//import node.js built in fs module
const fs = require('fs');

//import mongodb
const mongoose = require('mongoose');

//import existing schema through model
const Patient = require('./model/Patient');

//connect to mongodb
mongoose.connect('mongodb://localhost:27017/healthcare')
  .then(async () => {
    console.log('Connected to MongoDB');

 //read existing json file and assign the data to constant data
 const data = JSON.parse(fs.readFileSync('patients.json', 'utf-8'));

// insert data into mongodb through the constant
await Patient.insertMany(data);

//log
console.log('Migration complete');

//close connection
    mongoose.connection.close();
  })

 //catch error 
  .catch(err => console.error(err));
