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
  // Construct a query object based on the query parameters
  const queryObj = {};

  if (req.query.semester && req.query.semester !== 'all') {
    queryObj.semester = { $regex: new RegExp(`^${req.query.semester}$`, 'i') };
  }

  if (req.query.year) {
    queryObj.year = req.query.year;
  }

  if (req.query.professor) {
    queryObj.professor = req.query.professor;
  }

  // Use the queryObj to fetch reviews that match the criteria
  Review.find(queryObj)
    .then(reviews => {
      res.render('reviews', { reviews: reviews });
    })
    .catch(err => {
      console.error('Error fetching reviews:', err);
      res.status(500).send('Error retrieving reviews from the database');
    });
});

app.get('/reviews/add', (req, res) => {
  res.render('addReview');
});

app.post('/reviews/add', (req, res) => {
  const newReview = new Review({
      courseNumber: req.body.courseNumber,
      courseName: req.body.courseName,
      semester: req.body.semester,
      year: req.body.year,
      professor: req.body.professor,
      review: req.body.review
  });

  newReview.save()
      .then(() => {
          res.redirect('/');
      })
      .catch(err => {
          console.error('Error saving review:', err);
          res.status(500).render('error', { message: 'Error adding the review to the database' });
      });
});


app.listen(process.env.PORT || 3000);
