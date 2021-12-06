const Router = require('express');
const router = new Router();
const db = require('../models');
const User = db.user;

router.post('/', async (req, res) => {
  const userName = req.body.userName;
  const userEmail = req.body.userEmail;
  const user = await User.findOne({ where: { name: userName, email: userEmail }});
  if (!user) {
    const createUser = await User.create({ name: userName, email: userEmail })
    res.json(createUser);
  }
  res.json('user exist')
})

module.exports = router;