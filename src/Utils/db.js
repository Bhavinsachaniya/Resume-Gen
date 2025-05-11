const mongoose = require('mongoose');

// Fetch MongoDB URI from environment variable
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error("MongoDB URI not found in environment variables!");
  process.exit(1); // Exit the process if no URI is provided
}

// Define the connectDB function
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error: ", err);
    process.exit(1); // Exit the process if the connection fails
  }
};

// Export the connectDB function
module.exports = connectDB;
