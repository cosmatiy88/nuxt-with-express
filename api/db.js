const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://dush_user:dush$88@swmsr.g0xab.mongodb.net/dushllery113?retryWrites=true&w=majority', {
                            useNewUrlParser: true,
                            useUnifiedTopology: true,
                            useFindAndModify: false,
                            useCreateIndex: true
                          });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("MongoDB Connected...");
});

module.exports = db
