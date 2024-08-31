const express = require('express');
const HttpError = require("../models/http-error");
const placesController = require("../controllers/places-controller");

const router = express.Router(); 

router.get("/:placeId",placesController.getPlaceById),

router.get("/user/:userId",placesController.getPlacesByUser);

router.post("/",placesController.createPlace);

router.patch("/:placeId",placesController.updatePlace);

router.delete("/:placeId",placesController.deletePlace);

module.exports = router;