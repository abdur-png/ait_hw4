
import mongoose from 'mongoose';

// Define mongoose connection options
const mongooseOpts = {
    useNewUrlParser: true, // avoid DeprecationWarning: current URL string parser is deprecated
    useUnifiedTopology: true, // use the new topology engine, avoid DeprecationWarning for Server Discovery and Monitoring engine
    // Add other options here as needed
  };
  
  // Connect to MongoDB
  mongoose.connect(process.env.DSN, mongooseOpts)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });
  
  // my schema goes here!
  const ReviewSchema = new mongoose.Schema({
    courseNumber: {
      type: String,
      required: true, // Example validation
    },
    courseName: {
      type: String,
      required: true,
    },
    semester: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    professor: {
      type: String,
      required: true,
    },
    review: {
      type: String, // You could add more specific validation or requirements based on your needs
      required: true,
    },
  });
  // Define the model for the reviews
const Review = mongoose.model('Review', ReviewSchema);
// Export the model
export default Review;
