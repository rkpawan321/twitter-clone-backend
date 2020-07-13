const mongoose = require('mongoose');

const URI = "mongodb+srv://pawan1:rkpawan3211234@twitterclone.iecqb.mongodb.net/test?retryWrites=true&w=majority";

const connectDB = async () => {
  await mongoose.connect(URI,
     {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }
  );
  console.log('db connected..!');
};

module.exports = connectDB;
