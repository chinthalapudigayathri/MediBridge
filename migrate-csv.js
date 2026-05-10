//import node.js build on fs
const fs = require('fs');

//import mongoose
const mongoose = require('mongoose');

//import csv parser
const csv = require('csv-parser');

//import existing schema through model
const Patient = require('./model/Patient');

//connect to mongodb
mongoose.connect('mongodb://localhost:27017/healthcare')
  .then(() => {
    console.log('Connected to MongoDB');

//create an empty array. this array will store all patient objects stpred from csv
 const patients = [];
 
/*
1. read file as a stream
2. pipe it to csv parser
3. handle each row
4. create empty appoint,ments array
5. check if appointments exists
6 . is yes first split by | 
7. After split check if an array has exactly three values
8. If yes push into appoitments
*/
 fs.createReadStream('patients.csv')
 .pipe(csv())
 .on('data', (row) => {
    let appointments = [];
            if (row.appointments) {
                 const parts = row.appointments.split('|');
                  if (parts.length === 3) {
                    appointments.push({
              date: new Date(parts[0]),
              doctor: parts[1],
              notes: parts[2]
            });
                  }
                }

// add patient data
   patients.push({
          name: row.name,
          age: parseInt(row.age),
          gender: row.gender,
          medicalHistory: row.medicalHistory ? row.medicalHistory.split(';') : [],
          appointments
        });
      })
//insert into table
.on('end', async () => {
        await Patient.insertMany(patients);
        console.log('CSV migration complete');
        mongoose.connection.close();
      });
  })
//catch errors  
  .catch(err => console.error(err));      