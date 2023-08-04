const router = require('express').Router();
const { Post, User } = require('../models/');
// TODO: Go to '../utils/auth' and complete middleware function
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  //res.send('<div><b>Dashboard</b></div>');

  try {
    // TODO: 1. Find all Posts for a logged in user (use the req.session.userId)
    const postDb = await Post.findAll({
      where: {
        id: req.session.user_id,
      },
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // TODO: 2. Serialize data (use .get() method, or use raw: true, nest: true in query options)
    const allPosts = postDb.map((post) => post.get({ plain: true }));
    console.log('***********');
    console.log("User's Posts:");
    console.log({ allPosts });

    // TODO: 3. Render the 'all-posts-admin' template in the 'dashboard' layout with the posts data
    res.render('all-posts-admin', {
      allPosts,
    });
  } catch (err) {
    console.log(err);
    res.redirect('login');
  }
});

router.get('/new', withAuth, (req, res) => {
  // res.render('new-post', context) <- That loads by default main.handlebars for layout
  res.render('new-post', {
    layout: 'dashboard',
  });
});

router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    // TODO: 1. Find a Post by primary key
    // TODO: 2. Serialize data (use .get() method, or use raw: true, nest: true in query options)
    // TODO: 3. Render the 'edit-post' template in the 'dashboard' layout with the post data
    const postDb = await Post.findByPk(req.params.id);

    const singlePost = postDb.get({ plain: true });

    res.render('edit-post', {
      singlePost,
    });
  } catch (err) {
    res.redirect('login');
  }
});

module.exports = router;
