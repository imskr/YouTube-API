const mongoose = require('mongoose');
// importing mongo uri from config
const { MONGO_URI } = require('../../config');

// create mongo connection and connect with cluster
mongoose
    .connect(MONGO_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then(() => console.log('YouTube Database Connected'))
    .catch(err => console.log('YouTube Database Connection Err=>', err));

const dbConnection = mongoose.connection

// bind connection error
dbConnection.on('error', console.error.bind(console, 'connection error: '))

// check for connection
dbConnection.once('open', function () {
    console.log('Connected successfully')
});

module.exports = {
    dbConnection,
}
