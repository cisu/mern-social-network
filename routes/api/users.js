// bring in the express router to have routes to separate files
const express = require('express');
const router = express.Router();

// create a router

// @router  GET api/users
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('User route'));

// export the route
module.exports = router;
