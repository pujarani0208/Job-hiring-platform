const User = require("../models/User");
const Profile = require("../models/Profile");

exports.saveProfile = (req, res) => {
  const data = req.body;
  data['status'] = 'ACTIVE';
  if (data._id == undefined) {
    data._id = new ObjectId();
}
  Profile.findOneAndUpdate({ "_id":data._id }, data, { upsert:true })
    .then(
    res.json("Successfully saved profile")
  )
.catch((err) => console.log(err));
}

exports.getProfileById = async (req,  res) => {
    let id = req.params['id'];
    await Profile.find({_id : id})
      .then(profile => {
        const profileFunction = profile.map(profile => {
          const container = {}
          container._id = profile._id
          container.status = profile.status
          container.gender = profile.gender
          container.uniqueIdentity = profile.uniqueIdentity
          container.description = profile.description
          container.firstName = profile.firstName
          container.lastName = profile.lastName
          container.contactNo = profile.contactNo
          container.address = profile.address
          container.email = profile.email
          return container
        })
        res.status(200).json(profileFunction)
      })
      .catch(err =>
        res.status(401).json({ message: "Not successful", error: err.message })
      )
  };

  exports.getProfileByUserId = async (req,  res) => {
    let userId = req.params['userId'];
    await Profile.find({ userId : userId})
      .then(profile => {
        const profileFunction = profile.map(profile => {
          const container = {}
          container._id = profile._id
          container.status = profile.status
          container.gender = profile.gender
          container.uniqueIdentity = profile.uniqueIdentity
          container.description = profile.description
          container.firstName = profile.firstName
          container.lastName = profile.lastName
          container.contactNo = profile.contactNo
          container.address = profile.address
          container.email = profile.email
          return container
        })
        if (profileFunction.length == 0) {
          res.status(200).json({})
        } else {
          res.status(200).json(profileFunction[0])
        }
      })
      .catch(err =>
        res.status(401).json({ message: "Not successful", error: err.message })
      )
  };