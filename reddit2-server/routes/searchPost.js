const Router = require('express');
const { Sequelize } = require('../models');
const router = new Router();
const db = require('../models');
const Post = db.post;
const LikesCount = db.likesCount;
const RatingCount = db.ratingCount;

router.get('/', async (req, res) => {
  const searchValue = req.query.search;
  console.log(searchValue);
  const searchPosts = await Post.findAll({
    where: Sequelize.literal(`MATCH (tags,content) AGAINST('${searchValue}')`),
    include: [RatingCount, LikesCount]
  });
  console.log(searchPosts);
  res.json(searchPosts);
});

module.exports = router;
