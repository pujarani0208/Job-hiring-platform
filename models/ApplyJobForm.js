const mongoose = require("mongoose");

const ApplyJobFormSchema = new mongoose.Schema({
  jobId: {
    type: String,
    required: false
  },
  jobStatus: {
    type: String,
    required: true
  },
  applyStatus: {
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
    required: false
  }
});

const ApplyJobForm = mongoose.model("ApplyJobForm", ApplyJobFormSchema);

module.exports = ApplyJobForm;
