const express = require("express");
const router = express.Router();
const { saveProfile, getProfileById, getProfileByUserId } = require("../controllers/ProfileController");

router.post("/saveProfile", saveProfile );

router.get("/getProfileById/:id", getProfileById );

router.get("/getProfileByUserId/:userId", getProfileByUserId );


module.exports = router;