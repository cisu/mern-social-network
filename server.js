const express = require('express');

// initialize our app variable with Express.
const app = express();

// single endpoint
app.get('/', (req, res) => res.send('API Running'));

// process.env.PORT: look for an environment variable called port to use and when we deploy to heroku that's where it's gonna get the port number.
// if not found a process.env.PORT then open in port 5000
const PORT = process.env.PORT || 5000;

// take that variable and we want to listen on a port.
// it takes two parameters first the PORT and second a callback.
app.listen(PORT, () => {
  // see if connect is done
  console.log(`Server started o port ${PORT}`);
});
