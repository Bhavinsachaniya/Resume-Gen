const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error("MongoDB URI not found in environment variables!");
  process.exit(1);
}

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
<<<<<<< HEAD
=======
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
>>>>>>> b15d2e3 (update)
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error: ", err);
    process.exit(1); 
  }
};

module.exports = connectDB;
