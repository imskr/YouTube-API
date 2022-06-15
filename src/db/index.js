const mongoose = require('mongoose');
// importing mongo uri from config
const { MONGO_URI } = require('../../config');

// define database connection using mongoose
const dbConnection = async () => {
    try {
      await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('DB connected');
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };
  
module.exports = dbConnection;
