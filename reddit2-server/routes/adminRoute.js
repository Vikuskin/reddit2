const Router = require('express');
const router = new Router();
const db = require('../models');
const User = db.user;
const Post = db.post;

router.get('/', async (req, res) => {
  const checkUser = req.query.userEmail;
  console.log(req.query);
  console.log('check', checkUser);
  if (checkUser) {
    const checkRole = await User.findOne({ where: { email: checkUser } })
    if (checkRole.role === 'reader') {
      res.json('reader')
    } else {
      res.json('admin')
    }
  } else {
    const users = await User.findAll({ where: { role: 'reader' } });
    res.json(users)
  }
})

router.get('/id:', async (req, res) => {
  const userId = req.query.userId
  const userPosts = await Post.findAll({ where: { user_id: userId } })
  res.json(userPosts);
})

module.exports = router;