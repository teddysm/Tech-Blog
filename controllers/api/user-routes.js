const router = require('express').Router();
const { User } = require('../../models');

// POST /api/users/
router.post('/', async (req, res) => {
  console.log('POST /api/users/');
  try {
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    // TODO: save the user id, username, and loggedIn status to the req.session
    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.username = newUser.username;
      req.session.logged_in = true;
    });

    res.json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET /api/users/login
router.post('/login', async (req, res) => {
  console.log('GET /api/user/login');
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      res.status(400).json({ message: 'No user account found!' });
      console.log({ message: 'No user account found! Error Code: If!user' });
      return;
    }

    const validPassword = user.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'No user account found!' });
      console.log({
        message: 'No user account found! Error Code: !validPassword',
      });
      return;
    }

    // TODO: save the user id, username, and loggedIn status to the req.session
    console.log({
      a: user.id,
      b: user.username,
    });
    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.username = user.username;
      req.session.logged_in = true;

      console.log('******************');
      console.log('Saving to session');
      res.json({ user, message: 'You are now logged in!' });
    });

    console.log({ debug_session: req.session });
  } catch (err) {
    res.status(400).json({ message: 'No user account found!' });
    console.log({ message: 'No user account found! Error Code: catchOuter' });
  }
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
