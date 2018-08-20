const mongoose = require('mongoose');
const { mongodb } = require('./keys');

mongoose.connect(mongodb.mongoURI, {
    useNewUrlParser: true
})
    .then(db => console.log('Database is Connected'))
    .catch(err => console.log(err));

module.exports = mongoose;