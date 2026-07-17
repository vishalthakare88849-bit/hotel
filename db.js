const mongoose = require('mongoose');

// Define the MongoDB connection URL
const mongoURL = 'mongodb://localhost:27017/mydatabase';

// Connect to MongoDB
mongoose.connect(mongoURL);

// Get the default connection
const db = mongoose.connection;

// Connection events
db.on('connected', () => {
    console.log("Connected to MongoDB server");
});
 
db.on('error', (err) => {
    console.log("MongoDB connection error:", err);
});

db.on('disconnected', () => {
    console.log("MongoDB disconnected");
});

// Export the database connection
module.exports = db;