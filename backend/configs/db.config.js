const mongoose = require("mongoose");

const connectDB = async (url) => {
  try {
    console.log("Connecting to the database...");
    await mongoose.connect(url);
    console.log("Database connected successfully.");
  } catch (err) {
    console.error(`Error connecting to the database: ${err.message}`);
    throw err; // Rethrow error for handling in the main server file
  }
};

module.exports = connectDB;
