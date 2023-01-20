const router = require("express").Router();
const { SeedRequests, SeedOffers, User } = require('../../models')
const { theFerryman, linkGenerator } = require('../../utils')

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

    try {
      console.log(`Seed Offer: ${JSON.stringify(Number(successfulRequest.seedoffers_id))}`)
      const offer = await SeedOffers.findOne({
        where: {
          id: Number(successfulRequest.seedoffers_id)
        }
      })
      console.log(`Here is the offer${JSON.stringify(offer)}`)

      const user = await User.findOne({
        where: {
          id: offer.user_id,
        }
      })
      owner = {
        name: user.dataValues.username,
        email: user.dataValues.mailing
      }

      console.log(owner)
      const delivery = await theFerryman(owner, "request", offer.webLink)
      console.log(delivery)
      res.status(200)
    }
    catch (err) {
      console.log(err)
    }
  }
  catch (err) {
    console.log(`Request Failed`)
    console.log(err)
    res.status(500).json({ message: "Request Failed"})
  }
  
})

module.exports = router;