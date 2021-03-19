// bring in the express router to have routes to separate files
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const User = require('../../models/Users');

// create a router

// @router  GET api/auth
// @desc    Test route
// @access  Public
// whenever we want to use this middleware we add it as a second parameter like 'middleware auth'
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// export the route
module.exports = router;
