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
      console.log(`Seed Offer: ${JSON.stringify(successfulRequest.seedoffers_id)}`)
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
        email: user.dataValues.email
      }

      // This part not finished
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

router.post('/newOffer', async (req, res) => {
  try {
    const newOffer = {
      seedName: req.body.seedName,
      offerDescription: req.body.offerDescription,
      user_id: req.session.userID
    }
    console.log(`\n\nNew Offer${JSON.stringify(newOffer)}`)
  
    let uniqueLink = false;
    while (!uniqueLink) {
      let newLink = linkGenerator();
      uniqueLink = await SeedOffers.findOne({
        where: {
          webLink: newLink,
        },
      });
      if (uniqueLink === null) uniqueLink = newLink;
    }
    newOffer.webLink = uniqueLink;
  
    const postedOffer = await SeedOffers.create(newOffer);
    res.status(200).json({ message: "Offer Posted"})
  }
  catch (err) {
    console.log(err)
    res.status(500)
  }
})

module.exports = router;