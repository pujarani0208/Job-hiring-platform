const express = require("express");
const router = express.Router();
const { postJob, getAllPostedJobs, deactivateJob, getJobStatusForUser,
     applyJobForm, getAllAppliedJobs, getAppliedJobs, declineJobAplication,
      deleteJobAplication, acceptJobAplication, getAppliedJobsForUser } = require("../controllers/JobDetailController");

// Registers a new User
router.post("/postJob", postJob );
router.get("/getAllPostedJobs", getAllPostedJobs)
router.post("/applyJobForm", applyJobForm)
router.get("/getAllAppliedJobs", getAllAppliedJobs)
router.get("/getAppliedJobs/:jobId", getAppliedJobs)
router.get("/getAppliedJobsForUser/:userId", getAppliedJobsForUser)
router.get("/declineJobAplication/:id", declineJobAplication)
router.get("/deleteJobAplication/:id", deleteJobAplication)
router.get("/deactivateJob/:id", deactivateJob)
router.get("/acceptJobAplication/:id", acceptJobAplication)
router.get("/getJobStatusForUser/:userId/:jobId", getJobStatusForUser)

module.exports = router;