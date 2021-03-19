// bring in the express router to have routes to separate files
const express = require('express');
const router = express.Router();
// https://express-validator.github.io/docs/
const {check, validationResult} = require('express-validator/check');

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
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    res.send('User route');
  }
);

// export the route
module.exports = router;
