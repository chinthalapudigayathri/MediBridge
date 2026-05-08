/*import express framework
express frameowork is a light weight backend framework
it is used to create API's webservices, backend applications etc
*/
const express = require('express');

/* imports mongoose
Mongoose is an ODM library for MongoDB
It helps create Schemas, define models and interact with MongoDB easily
this is JPa/hibernate in java for js
*/
const mongoose = require('mongoose');

/* import cors
CORS helps communication from backend to frontend easily
*/
const cors = require('cors');

/* We are creating an express application object
app object here on means backend server
it is used to start server, define API, configure middleware
*/
const app = express();

/* telling server that we are parsing json requests
and enables backend-frontend calls through cors
*/
app.use(express.json());
app.use(cors());


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/healthcare')
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Patient Schema
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

const Patient = mongoose.model('Patient', patientSchema);

// API Endpoints
app.post('/patients', async (req, res) => {
  const patient = new Patient(req.body);
  await patient.save();
  res.json(patient);
});

app.get('/patients', async (req, res) => {
  const patients = await Patient.find();
  res.json(patients);
});


app.put('/patients/:id', async (req, res) => {
  const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedPatient);
});


app.delete('/patients/:id', async (req, res) => {
  await Patient.findByIdAndDelete(req.params.id);
  res.json({ message: 'Patient deleted successfully' });
});


app.listen(5000, () => console.log('Server running on port 5000'));