const JobForm = require("../models/JobForm");
const ApplyJobForm = require("../models/ApplyJobForm");
const User = require("../models/User"); // User model
const Profile = require("../models/Profile");

exports.postJob = (req, res) => {
  const data = req.body;
        data['status'] = 'ACTIVE';
        const newJobDetails = new JobForm(data);
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

exports.applyJobForm = async (req, res) => {
  const data = req.body;
  data['status'] = 'PENDING';
  // const user = await User.findOne({ _id: data.userId });
  // console.log("fs", user)
  // data['personName'] = user.name;
  const newJobDetails = new ApplyJobForm(data);
      newJobDetails
        .save()
        .then(
        res.json("Job applied successfuly")
        )
        .catch((err) => console.log(err));
}

exports.getJobStatusForUser = async (req, res) => {
  const jobId = req.params['jobId'];
  const userId = req.params['userId'];
  const job = await ApplyJobForm.findOne({userId : userId, jobId : jobId})
  if (job) {
    return res.status(200).json({id: job._id, status: job.status});
  } else {
    return res.status(200).json({id: "", status: "APPLY"});
  }
}

exports.getAllAppliedJobs = async (req,  res) => {
  await ApplyJobForm.find({})
    .then(jobs => {
      const jobFunction = jobs.map(job => {
        const container = {}
        container._id = job._id
        container.status = job.status
        container.userId = job.userId
        container.personName = job.personName
        container.description = job.description
        return container
      })
      res.status(200).json(jobFunction)
    })
    .catch(err =>
      res.status(401).json({ message: "Not successful", error: err.message })
    )
};

exports.getAppliedJobs = async (req,  res) => {
  let jobId = req.params['jobId'];
  await ApplyJobForm.find({jobId : jobId})
    .then(jobs => {
      const jobFunction = jobs.map(job => {
        const container = {}
        container._id = job._id
        container.status = job.status
        container.userId = job.userId
        container.personName = job.personName
        container.description = job.description
        return container
      })
      res.status(200).json(jobFunction)
    })
    .catch(err =>
      res.status(401).json({ message: "Not successful", error: err.message })
    )
};

exports.getAppliedJobsForUser = async (req,  res) => {
  let userId = req.params['userId'];
  await ApplyJobForm.find({userId : userId})
    .then(jobs => {
      const jobFunction = jobs.map(job => {
        const container = {}
        container._id = job._id
        container.status = job.status
        container.userId = job.userId
        container.personName = job.personName
        container.description = job.description
        return container
      })
      res.status(200).json(jobFunction)
    })
    .catch(err =>
      res.status(401).json({ message: "Not successful", error: err.message })
    )
};

exports.declineJobAplication = async (req,  res) => {
  let id = req.params['id'];
  await ApplyJobForm.findOneAndUpdate({_id: id}, {$set : {status : 'DECLINE'}})
    .then(job => res.status(200).json(job))
    .catch(err =>
      res.status(401).json({ message: "Not successful", error: err.message })
    )
};

exports.deleteJobAplication = async (req,  res) => {
  let id = req.params['id'];
  await ApplyJobForm.findOneAndDelete({_id: id})
    .then(job => res.status(200).json(job))
    .catch(err =>
      res.status(401).json({ message: "Not successful", error: err.message })
    )
};

exports.deactivateJob = async (req,  res) => {
  let id = req.params['id'];
  await ApplyJobForm.findOneAndUpdate({jobId: id}, {$set : {status : 'INACTIVE'}});
  await JobForm.findOneAndUpdate({_id: id}, {$set : {status : 'INACTIVE'}})
    .then(job => res.status(200).json(job))
    .catch(err =>
      res.status(401).json({ message: "Not successful", error: err.message })
    )
};

exports.acceptJobAplication = async (req,  res) => {
  let id = req.params['id'];
  await ApplyJobForm.findOneAndUpdate({_id: id}, {$set : {status : 'ACCEPT'}})
    .then(job => res.status(200).json(job))
    .catch(err =>
      res.status(401).json({ message: "Not successful", error: err.message })
    )
};
