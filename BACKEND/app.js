// Imports
const express = require('express');
const bodyParser = require('body-parser');
const HttpError = require("./models/http-error");

// Import routes
const placesRoutes = require("./routes/places-routes");

const app = express();

// Middleware
app.use(bodyParser.json());

// Middleware places
app.use("/api/places",placesRoutes);

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

app.listen(5000);
