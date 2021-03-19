// bring in the express router to have routes to separate files
const express = require('express');
const router = express.Router();

// create a router

// @router  GET api/profile
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('Profile router'));

// export the route
module.exports = router;
