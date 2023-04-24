const JobForm = require("../models/JobForm");
const ApplyJobForm = require("../models/ApplyJobForm");
const User = require("../models/User"); // User model

exports.postJob = (req, res) => {
  const data = req.body;
      // Check for existing user
      // User.findById(data.userId).then((user) => {
      //   if (user) return res.status(400).json("job details already exists");

        //New job details created
        const newJobDetails = new JobForm(data);
            // Save job details
            newJobDetails
              .save()
              .then(
                res.json("Successfully posted new job")
              )
              .catch((err) => console.log(err));
}

exports.getAllPostedJobs = async (req,  res) => {
  await JobForm.find({})
    .then(JobForms => {
      const jobFunction = JobForms.map(job => {
        const container = {}
        container._id = job._id
        container.jobTitle = job.jobTitle
        container.openings = job.openings
        container.location = job.location
        container.salary = job.salary
        container.description = job.description
        container.companyName = job.companyName
        container.personName = job.personName
        container.contactNo = job.contactNo
        container.contactPersonProfile = job.contactPersonProfile
        container.jobAddress = job.jobAddress
        container.email = job.email
        return container
      })
      res.status(200).json(jobFunction)
    })
    .catch(err =>
      res.status(401).json({ message: "Not successful", error: err.message })
    )
};

exports.applyJobForm = (req, res) => {
  const data = req.body;
      // Check for existing user
      // User.findById(data.userId).then((user) => {
      //   if (user) return res.status(400).json("job details already exists");

        //New job details created
        const newJobDetails = new ApplyJobForm(data);
            // Save job details
            newJobDetails
              .save()
              .then(
                res.json("Job applied successfuly")
              )
              .catch((err) => console.log(err));
}

exports.getAllAppliedJobs = async (req,  res) => {
  await ApplyJobForm.find({})
    .then(jobs => {
      const jobFunction = jobs.map(job => {
        const container = {}
        container._id = job._id
        container.gender = job.gender
        container.uniqueIdentity = job.uniqueIdentity
        container.location = job.location
        container.description = job.description
        container.companyName = job.companyName
        container.personName = job.personName
        container.contactNo = job.contactNo
        container.contactPersonProfile = job.contactPersonProfile
        container.address = job.address
        container.email = job.email
        return container
      })
      res.status(200).json(jobFunction)
    })
    .catch(err =>
      res.status(401).json({ message: "Not successful", error: err.message })
    )
};
