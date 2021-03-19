// bring in the express router to have routes to separate files
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
// https://express-validator.github.io/docs/
// const {check, validationResult} = require('express-validator/check');
const {check, validationResult} = require('express-validator');

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

// @router  POST api/auth
// @desc    Authenticate user & get token
// @access  Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],

  // Checking for errors in the body
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    // destructuring req.body
    const {email, password} = req.body;

    // Make a query with mongoose
    try {
      // See if user exists already
      let user = await User.findOne({email});

      // check if not a user
      if (!user) {
        return res.status(400).json({
          errors: [{msg: 'Invalid Credentials'}],
        });
      }

      // Check if the password matches
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          errors: [{msg: 'Invalid Credentials'}],
        });
      }

      // Return jsonwebtoken
      // get the payload which includes the user id
      const payload = {
        user: {
          id: user.id,
        },
      };

      // sign the token
      jwt.sign(
        // pass the payload
        payload,
        // pass the secret
        config.get('jwtSecret'),
        // expiration
        {expiresIn: 3600000},
        // inside the callback we'll get either an error or a token
        (err, token) => {
          if (err) throw err;
          res.json({token});
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// export the route
module.exports = router;
