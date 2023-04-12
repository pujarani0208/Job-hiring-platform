const express = require("express");
const router = express.Router();
const { postJob, getAllPostedJobs } = require("../controllers/JobDetailController");

// Registers a new User
router.post("/postJob", postJob );
router.get("/getAllPostedJobs", getAllPostedJobs)
module.exports = router;