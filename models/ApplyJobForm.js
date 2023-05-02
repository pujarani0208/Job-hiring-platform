const mongoose = require("mongoose");

const ApplyJobFormSchema = new mongoose.Schema({
  jobId: {
    type: String,
    required: false
},
  status: {
    type: String,
    required: true
  },
  personName: {
    type: String,
    required: false
  },
    userId: {
    type: String,
    required: false
},
  description: {
    type: String,
    required: true
  }
});

const ApplyJobForm = mongoose.model("ApplyJobForm", ApplyJobFormSchema);

module.exports = ApplyJobForm;
