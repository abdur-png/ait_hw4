import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
import './config.mjs';
import './db.mjs';  // This ensures the database connection is established
import mongoose from 'mongoose';
const Review = mongoose.model('Review');  // This retrieves the model you registered


// set up express static
import url from 'url';
import path from 'path';
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'public')));

// configure templating to hbs
app.set('view engine', 'hbs');

// body parser (req.body)
app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => {
  Review.find({})  // This empty object means "no specific query, return all"
    .then(reviews => {
      // 'reviews' contains the list of reviews returned by the query
      res.render('reviews', { reviews: reviews });  // Render them using a view named 'reviews'
    })
    .catch(err => {
      // Always good to catch errors
      console.error('Error fetching reviews:', err);
      res.status(500).send('Error retrieving reviews from the database');
    });
});


app.listen(process.env.PORT || 3000);
