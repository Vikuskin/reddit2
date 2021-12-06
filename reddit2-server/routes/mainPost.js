const Router = require('express');
const router = new Router();
const db = require('../models');
const Post = db.post;
const User = db.user;
const Rating = db.rating;
const RatingCount = db.ratingCount;
const Likes = db.likes;
const LikesCount = db.likesCount;

router.get('/', async (req, res) => {
  const postId = req.query.postId;
  if (postId) {
    const post = await Post.findOne({ 
      where: { id: postId },
      include: [RatingCount, LikesCount]
    });
    res.json(post)
  } else {
    const postsLast = await Post.findAll({
      order: [
        ['id', 'DESC']
      ],
      include: [RatingCount, LikesCount],
      limit: 3
    });
    const maxLikes = await LikesCount.findAll({
      order: [
        ['likes', 'DESC']
      ],
      limit: 3
    })

    const popularPosts = [];
    await maxLikes.forEach(item => {
      Post.findOne({ 
        where: { id: item.dataValues.post_id },
        include: [RatingCount, LikesCount] 
      }).then(res => {
        popularPosts.push(res);
      })
    });
    postsLast.push(popularPosts)

    const tags = await Post.findAll({
      order: [
        ['id', 'DESC']
      ],
      attributes: ['tags']
    })
    postsLast.push(tags);
    
    res.json(postsLast)
  }
})

router.put('/', async (req, res) => {
  const { rating, postId, userEmail, likes } = req.body;
  const user = await User.findOne({ where: { email: userEmail }});
  if (!likes) {  
    const ratingsExist = await Rating.findOne({ where: { user_id: user.id, post_id: postId } });
    const ratingData = {
      stars: rating,
      user_id: user.id,
      post_id: postId
    }
    if (!ratingsExist) {
      const ratingCreate = await Rating.create(ratingData);
      
      const ratingAll = await Rating.findAll({ 
        where: { post_id: postId },
        attributes: ['stars'] 
      });
      let ratingSum = 0;
      for (let i = 0; i < ratingAll.length; i++) {
        ratingSum += ratingAll[i].dataValues.stars;
      }
      const ratingCount = {
        stars: ratingSum / ratingAll.length
      }
      const ratingCountUpdate = await RatingCount.update(ratingCount, { where: { post_id: postId } })
      res.json(ratingCountUpdate);

    } else {
      const ratingUpdate = await Rating.update(ratingData, { where: { user_id: user.id, post_id: postId } });

      const ratingAll = await Rating.findAll({ 
        where: { post_id: postId },
        attributes: ['stars'] 
      });
      let ratingSum = 0;
      for (let i = 0; i < ratingAll.length; i++) {
        ratingSum += ratingAll[i].dataValues.stars;
      }
      const ratingCount = {
        stars: ratingSum / ratingAll.length
      }
      const ratingCountUpdate = await RatingCount.update(ratingCount, { where: { post_id: postId } })
      res.json(ratingCountUpdate);
    }   
  } else {
    const likesExist = await Likes.findOne({ where: { user_id: user.id, post_id: postId } });
    if (likesExist) {
      if (likesExist.like === 1) {
        const likeRemove = await Likes.update({ like: 0 }, { where: { user_id: user.id, post_id: postId } });
      } else {
        const likeAdd = await Likes.update({ like: 1 }, { where: { user_id: user.id, post_id: postId } });
      }
    } else {
      const likeCreate = await Likes.create({ like: 1, user_id: user.id, post_id: postId });
    }
    const likesAll = await Likes.findAll({
        where: { post_id: postId },
        attributes: ['like']
      })
      let likesSum = 0;
      for (let i = 0; i < likesAll.length; i++) {
        likesSum += likesAll[i].dataValues.like;
      }
      const likesUpdate = await LikesCount.update({ likes: likesSum }, { where: { post_id: postId } })
      res.json(likesSum);
  }
})

module.exports = router;