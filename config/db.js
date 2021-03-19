// create connection with mongodb

const mongoose = require('mongoose');
// bring in the config package to grab the mongoURI
const config = require('config');
// config.get(): get any values to pass in
const db = config.get('mongoURI');

// connect with mongodb
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);

    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
