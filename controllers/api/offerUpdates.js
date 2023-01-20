const router = require("express").Router();
const { SeedRequests, SeedOffers, User } = require('../../models')

router.post('/requestSeed', async (req, res) => {
  console.log(`Seed Requested`)
  const requests = await SeedRequests.findAll({
    where: {
      user_id: req.session.userID, 
      seedoffers_id: req.body.seedID
    }
  })
  if (requests !== null) {
    console.log("Request already exists")
    return res.status(400).json({ message: "Already Requested"})
  }
  try {
    const request = {
      user_id: req.session.userID, 
      seedoffers_id: req.body.seedID
    }
    const successfulRequest = await SeedRequests.create(request)
    try {
      const offer = SeedOffers.findOne({
        where: {
          id: req.body.seedID
        }
      })
      const owner = await User.findOne({
        where: {
          id: offer.user_id,
        include: {
          attributes: ["username", "email"],
        }
        }
      })
      console.log(owner)
      res.status(200)
    }
    catch (err) {

    }
  }
  catch (err) {
    console.log(`Request Failed`)
    console.log(err)
    res.status(500).json({ message: "Request Failed"})
  }
  
})

module.exports = router;