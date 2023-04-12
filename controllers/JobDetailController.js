const JobForm = require("../models/JobForm");
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
                res.json("Successfully added job details")
              )
              .catch((err) => console.log(err));
}

exports.getAllPostedJobs = async (req,  res) => {
  await JobForm.find({})
    .then(JobForms => {
      const jobFunction = JobForms.map(job => {
        const container = {}
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
      res.status(200).json({ job: jobFunction })
    })
    .catch(err =>
      res.status(401).json({ message: "Not successful", error: err.message })
    )
};