const mongoose = require("mongoose");

const ApplyJobFormSchema = new mongoose.Schema({
  jobId: {
    type: String,
    required: false
},
    userId: {
    type: String,
    required: false
},
  gender: {
    type: String,
    required: true
  },
  uniqueIdentity: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  description: {
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
  address: {
    type: String,
    required: true
  },
});

const ApplyJobForm = mongoose.model("ApplyJobForm", ApplyJobFormSchema);

module.exports = ApplyJobForm;
