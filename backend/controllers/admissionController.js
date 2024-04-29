const Admission = require("../models/admissionSchema");

module.exports.admissions = (req, res) => {
  Admission.find({})
    .then((admissions) => res.json(admissions))
    .catch((error) => res.status(500).json({ error: error.message || "Internal Server Error" }));
};


module.exports.admission = (req, res) => {
  const admissionID = req.params.id;

  Admission.findById(admissionID)
    .then((admission) => {
      if (!admission) {
        return res.status(404).json({ error: "Admission not found" });
      }
      res.json(admission);
    })
    .catch((error) => res.status(500).json({ error: error.message || "Internal Server Error" }));
};


module.exports.createAdmission = (req, res) => {
  const { admissionDate, dischargeDate, diagnosis } = req.body;

  const newAdmission = new Admission({
    admissionDate,
    dischargeDate,
    diagnosis,
  });

  newAdmission.save()
    .then((savedAdmission) => res.status(201).json(savedAdmission))
    .catch((error) => res.status(500).json({ error: error.message || "Internal Server Error" }));
};


module.exports.updateAdmission = (req, res) => {
  const admissionID = req.params.id;
  const updatedFields = req.body;

  Admission.findByIdAndUpdate(admissionID, updatedFields, { new: true })
    .then((updatedAdmission) => {
      if (!updatedAdmission) {
        return res.status(404).json({ error: "Admission not found" });
      }
      res.json(updatedAdmission);
    })
    .catch((error) => res.status(500).json({ error: error.message || "Internal Server Error" }));
};


module.exports.deleteAdmission = (req, res) => {
  const admissionID = req.params.id;

  Admission.findByIdAndDelete(admissionID)
    .then((deletedAdmission) => {
      if (!deletedAdmission) {
        return res.status(404).json({ error: "Admission not found" });
      }
      res.json({ message: "Admission deleted successfully" });
    })
    .catch((error) => res.status(500).json({ error: error.message || "Internal Server Error" }));
};
