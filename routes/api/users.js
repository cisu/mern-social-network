// bring in the express router to have routes to separate files
const express = require('express');
const router = express.Router();

const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
// https://express-validator.github.io/docs/
// const {check, validationResult} = require('express-validator/check');
const {check, validationResult} = require('express-validator');

// User model
const User = require('../../models/Users');

// create a router

// @router  POST api/users
// @desc    Register user
// @access  Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 8 or more characters'
    ).isLength({min: 8}),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    // destructuring req.body
    const {name, email, password} = req.body;

    // Make a query with mongoose
    try {
      // See if user exists already
      let user = await User.findOne({email});
      if (user) {
        res.status(400).json({
          errors: [{msg: 'User already exists'}],
        });
      }
      // Get users gravatar
      const avatar = gravatar.url(email, {
        s: '200', // for size img
        r: 'pg', // r for rating,'pg' can't have any naked plp img
        d: 'mm', // d for default 'mm' gives you a default img
      });

      // create an instance of a user
      user = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.avatar,
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      // hash the password
      user.password = await bcrypt.hash(password, salt);

      //   save user in database
      await user.save();

      // Return jsonwebtoken
      res.send('User registered');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// export the route
module.exports = router;
