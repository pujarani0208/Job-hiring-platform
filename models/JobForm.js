const mongoose = require("mongoose");

const JobFormSchema = new mongoose.Schema({
    userId: {
    type: String,
    required: false
},
  jobTitle: {
    type: String,
    required: true
  },
  openings: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  salary: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  personName: {
    type: String,
    required: true
  },
  contactNo: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  contactPersonProfile: {
    type: String,
    required: true
  },
  jobAddress: {
    type: String,
    required: true
  },
});

const JobForm = mongoose.model("JobForm", JobFormSchema);

module.exports = JobForm;
