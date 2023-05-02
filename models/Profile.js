const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  status: {
    type: String,
    required: true
  },
    userId: {
    type: String,
    required: false
},
  gender: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: false
  },
  uniqueIdentity: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: false
  },
  contactNo: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: false
  },
});

const Profile = mongoose.model("Profile", ProfileSchema);

module.exports = Profile;
