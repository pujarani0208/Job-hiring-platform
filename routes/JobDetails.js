const express = require("express");
const router = express.Router();
const { postJob, getAllPostedJobs, applyJobForm, getAllAppliedJobs } = require("../controllers/JobDetailController");

// Registers a new User
router.post("/postJob", postJob );
router.get("/getAllPostedJobs", getAllPostedJobs)
router.post("/applyJobForm", applyJobForm)
router.get("/getAllAppliedJobs", getAllAppliedJobs)

module.exports = router;