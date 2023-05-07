const JobForm = require("../models/JobForm");
const ApplyJobForm = require("../models/ApplyJobForm");
const User = require("../models/User"); // User model
const Profile = require("../models/Profile");
const  ObjectID = require('mongodb').ObjectId;

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
  data['applyStatus'] = 'APPLIED';
  data['jobStatus'] = 'PENDING';

  if (data.id == undefined || data.id == "") {
    data.id = new ObjectID();
  }
  await ApplyJobForm.findOneAndUpdate({ "_id": data.id }, data, { upsert:true })
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
    return res.status(200).json({id: job._id, applyStatus: job.applyStatus, jobStatus: job.jobStatus, description: job.description});
  } else {
    return res.status(200).json({id: "", applyStatus: "NOT_APPLIED", description: "", jobStatus: "NOT_APPLIED"});
  }
}

exports.getAllAppliedJobs = async (req,  res) => {
  await ApplyJobForm.find({})
    .then(jobs => {
      const jobFunction = jobs.map(job => {
        const container = {}
        container._id = job._id
        container.jobStatus = job.jobStatus
        container.applyStatus = job.applyStatus
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
        container.jobStatus = job.jobStatus
        container.applyStatus = job.applyStatus
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
        container.jobStatus = job.jobStatus
        container.applyStatus = job.applyStatus
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
  await ApplyJobForm.findOneAndUpdate({_id: id}, {$set : {applyStatus : 'NOT_APPLIED',jobStatus: 'NOT_APPLIED', description: ""}})
    .then(job => res.status(200).json(job))
    .catch(err =>
      res.status(401).json({ message: "Not successful", error: err.message })
    )
};

exports.deactivateJob = async (req,  res) => {
  let id = req.params['id'];
  await ApplyJobForm.findOneAndUpdate({jobId: id}, {$set : {jobStatus : 'DECLINED'}});
  await JobForm.findOneAndUpdate({_id: id}, {$set : {status : 'INACTIVE'}})
    .then(job => res.status(200).json(job))
    .catch(err =>
      res.status(401).json({ message: "Not successful", error: err.message })
    )
};

exports.acceptJobAplication = async (req,  res) => {
  let id = req.params['id'];
  await ApplyJobForm.findOneAndUpdate({_id: id}, {$set : {jobStatus : 'ACCEPTED'}})
    .then(job => res.status(200).json(job))
    .catch(err =>
      res.status(401).json({ message: "Not successful", error: err.message })
    )
};
