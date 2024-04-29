const Doctor = require("../models/doctorSchema");

const mongoose = require("mongoose");

module.exports.doctors = (req, res) => {
    Doctor.find({ active: true })
    .then((doctor) => res.send(doctor))
    .catch((error) => res.send(error));
};

module.exports.doctor = (req, res) => {
  const doctorID = req.params.id;

  Doctor.findById(doctorID)
    .then((doctor) => res.send(doctor))
    .catch((error) => res.send(error));
};

module.exports.createDoctor = (req, res) => {
  const { firstName, lastName, specialty, active} = req.body;

  const newDoctor = new Doctor({
    firstName,
    lastName,
    specialty,
    active
  });

  try {
    const savedDoctor = Doctor.save();
    res.status(201).json({ "new doctor": newDoctor});
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

module.exports.deleteDoctor = (req, res) => {
  const doctorID = req.params.doctorID;
  console.log(doctorID);

  const update = { active: false, confined: false };

  Doctor.findByIdAndUpdate(doctorID, update, { new: true })
    .then((doctor) => res.send(doctor))
    .catch((error) => res.send(error));
};

module.exports.updateDoctor = (req, res) => {
  const { firstName, lastName, specialty, active } = req.body;

  console.log(req.body);

  const doctorID = req.params.id;
  console.log(doctorID);

  const updatedFields = { firstName, lastName, specialty, active };

  console.log(updatedFields);

  Doctor.findByIdAndUpdate(doctorID, updatedFields, { new: true })
    .then((updatedDoctor) => {
      if (!updatedDoctor) {
        return res.status(404).json({ error: "doctor not found" });
      }

      res.status(200).json(updatedDoctor);
    })

    .catch((error) => {
      res.status(500).json({ error: error.message || "Internal server error" });
    });
};
