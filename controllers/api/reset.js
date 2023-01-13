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
  resetRequest = {
    resetLink: uniqueLink,
    user_id: req.session.id
  }
  user = {
    name: req.session.name,
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
  res.render('passwordReset', resetUser)
})