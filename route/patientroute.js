// import express.js library
const express = require('express');

//creating new express router object
const router = express.Router();

//import patient model
const Patient = require('../model/Patient');
/* with this we can interact with mongodb using
Patient.find()
Patient.save()
Patient.deleteOne()
*/

//create POST API route
router.post('/', async (req, res) => 
{
try {
    //created new patient object
    const patient = new Patient(req.body);
    //saves patient data to MongoDB
    await patient.save();
    //sending response back
    res.status(201).json(patient);
  } 
  catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//create GET API route
router.get('/', async (req, res) => {
  const patients = await Patient.find();
  res.json(patients);
});

//create UPDATE API route
router.put('/:id', async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    res.json(patient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//create DELETE API route
router.delete('/:id', async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    res.json({ message: 'Patient deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//export router so that it can be reused in another file
module.exports = router;