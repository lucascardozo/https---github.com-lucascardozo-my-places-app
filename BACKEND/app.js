// Imports
const express = require('express');
const bodyParser = require('body-parser');
const HttpError = require("./models/http-error");
const mongoose = require('mongoose');

// Import routes
const placesRoutes  = require("./routes/places-routes");
const userRoutes    = require("./routes/users-routes");

const app = express();

// Middleware
app.use(bodyParser.json());

// Middleware places
app.use("/api/places",placesRoutes);

// Middleware users
app.use('/api/users',userRoutes);

// Middleware to routes lost
app.use((req,res,next) => {
    const error = new HttpError("Could not find this route.",404);
    throw error;
});

// Middleware error
app.use((error,req,res,next) => {
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message || "An Unknown error occured!"});
});

// database connection
mongoose
  .connect('mongodb+srv://user_root:zSa3x8yDOY2cJhAz@mern-comit.afnfy.mongodb.net/my-places?retryWrites=true&w=majority&appName=mern-comit')
  .then(() => {
    console.log("Successfully connected to the db.");
    app.listen(5000);
  })
  .catch(err => {
    console.error(`Unable to connect to the database with error: ${err}`)
    console.log(err);
  });
