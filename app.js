const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

const app = express();

// Connect to mongo db
const dbURI =
  'mongodb+srv://zaelgohary:yKz8Jsx%40XC8ea2y@cluster0.wh7nu.mongodb.net/node-tuts?retryWrites=true&w=majority';

mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// setting view engine
app.set('view engine', 'ejs');

// middlewares
app.use(express.static('public'));

// urlencoded passes the data from the form to the request object
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// Routes
app.use(blogRoutes);

app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
