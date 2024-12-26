const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    
    await mongoose.connect("mongodb+srv://muhammadumar:abid.12345@cluster.3mpl5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster");
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit with failure
  }
};

module.exports = connectDB;
