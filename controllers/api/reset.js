const router = require('express').Router();
const { EmailReset, User } = require('../../models')
const { theFerryman, linkGenerator } = require('../../utils')

router.use('/', async (req, res) => {
  let uniqueLink = false;
  while(!uniqueLink) {
    newLink = linkGenerator();
    uniqueLink = await EmailReset.findOne({
      where: {
        resetLink: newLink
      }
    })
    if (uniqueLink === null) uniqueLink = newLink;
  }
  requestedUser = await User.findOne({
    where: {
      email: req.body.email
    }
  })
  resetRequest = {
    resetLink: uniqueLink,
    user_id: requestedUser.id
  }
  user = {
    name: requestedUser.name,
    email: req.body.email
  }
  const logRequest = await EmailReset.create(resetRequest);
  if(logRequest) {
    await theFerryman(user, 'password', uniqueLink);
    return res.status(200).json({ message: 'Request Sent'})
  }
  res.status(500).json({ message: 'Reset Request Failed'})
})

router.use('/:link', async (req, res) => {
  const resetUser = await EmailReset.findOne({
    where: {
      resetLink: req.params.link
    }
  });
  const updatedUser = await User.findOne({
    where: {
      id: resetUser.user_id
    }
  })

  updatedUser.set({
    password: req.body.password
  });

  await updatedUser.save();
  res.status(200).json({ message: "Password Reset"});
})