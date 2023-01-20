const router = require("express").Router();
const { SeedRequests, SeedOffers, User } = require('../../models')

router.post('/requestSeed', async (req, res) => {
  const requests = await SeedRequests.findAll({
    where: {
      user_id: req.session.userID, 
      seedoffers_id: req.body.seedID
    }
  })
  if (requests.length > 0) {
    console.log("Request already exists")
    return res.status(400).json({ message: "Already Requested"})
  }
  try {
    console.log(`Building Request\n\n`)
    const request = {
      user_id: req.session.userID, 
      seedoffers_id: req.body.seedID
    }
    const successfulRequest = await SeedRequests.create(request)
    console.log(`Completed Request:\n\n${JSON.stringify(successfulRequest)}`)
    try {
      console.log(`Seed Offer:\n\n${JSON.stringify(successfulRequest.seedoffers_id)}`)
      const offer = SeedOffers.findOne({
        where: {
          id: successfulRequest.seedoffers_id
        }
      })
      console.log(`Here is the offer${JSON.stringify(offer)}`)
      const owner = await User.findOne({
        where: {
          id: offer.user_id,
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