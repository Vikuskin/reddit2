const Router = require('express');
const router = new Router();
const { cloudinary } = require('../cloudinary');
const db = require('../models');
const Post = db.post;
const User = db.user;
const RatingCount = db.ratingCount;
const Rating = db.rating;
const Likes = db.likes;
const LikesCount = db.likesCount;

router.post('/new_review', async (req, res) => {
  const user = await User.findOne({ where: { email: req.body.user } });
  const postContent = {
    groups: req.body.group,
    tags: req.body.tags,
    content: req.body.text,
    mark: req.body.mark,
    user_id: user.id
  }
  const newPost = await Post.create(postContent);
  const newPostCountRating = await RatingCount.create({ stars: 0, post_id: newPost.id });
  const newPostLikes = await LikesCount.create({ like: 0, post_id: newPost.id });

  if (req.body.images[0] !== undefined) {
    for (let i = 0; i < req.body.images.length; i++) {
      const uploadedResponse = await cloudinary.uploader.upload(req.body.images[i], {
        public_id: 'reddit2/' + newPost.id + '/' + i,
      });
      newPost.imagesFolder = 'reddit2/' + newPost.id + '/' + i
    }
    await newPost.save();
  }
  res.json(newPost);
})

router.get('/new_review', async (req, res) => {
  const tags = await Post.findAll({
    attributes: ['tags']
  });
  console.log(tags);
  res.json(tags)
})

router.get('/', async (req, res) => {
  const user = await User.findOne({ where: { email: req.query.user } });
  const posts = await Post.findAll({ 
    where: { user_id: user.id },
    include: [RatingCount] 
  });
  res.json(posts);
})

router.delete('/', async (req, res) => {
  const postId = req.query.id;
  await Likes.destroy({
    where: { post_id: postId }
  }).catch(err => console.log(err))
  await LikesCount.destroy({
    where: { post_id: postId }
  }).catch(err => console.log(err))
  await RatingCount.destroy({
    where: { post_id: postId }
  }).catch(err => console.log(err))
  await Post.destroy({ 
    where: { id: postId }
  }).catch(err => console.log(err))
  await Rating.destroy({ where: { post_id: postId } }).catch(err => console.log(err))
  res.json('deleted')
})

router.put('/', async (req, res) => {
  const postId = req.body.postId;
  const postContent = {
    groups: req.body.group,
    tags: req.body.tags,
    content: req.body.text,
    mark: req.body.mark,
  }
  const updatePost = await Post.update(postContent, { where: { id: postId } });
  res.json(updatePost);
})


module.exports = router;