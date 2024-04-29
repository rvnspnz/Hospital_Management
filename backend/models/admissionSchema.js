const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const admissionSchema = new Schema({
  admissionDate: {
    type: Date,
    default: new Date(),
  },
  dischargeDate: {
    type: Date,
    default: new Date(),

  },
  diagnosis: {
    type: String,
    required: [true, "Diagnosis is required"],
  }
});

const Admission = mongoose.model("Admission", admissionSchema);
module.exports = Admission;
