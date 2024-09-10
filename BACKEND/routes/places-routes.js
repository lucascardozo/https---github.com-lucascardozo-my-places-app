const express = require('express');
const {check} = require('express-validator');
const HttpError = require("../models/http-error");
const placesController = require("../controllers/places-controller");
const fileUpload = require('../middleware/file-upload');

const router = express.Router(); 

router.get("/:placeId",placesController.getPlaceById),

router.get("/user/:userId",placesController.getPlacesByUser);

router.post(
    "/",
    fileUpload.single('image'),
    [
        check('title').not().isEmpty(),
        check('description').isLength({min:5}),
        check('address').not().isEmpty()
    ], 
    placesController.createPlace);

router.patch("/:placeId",
    fileUpload.single('image'),
    [
        check('title').not().isEmpty(),
        check('description').isLength({min:5}),
        check('address').not().isEmpty()
    ], placesController.updatePlace);

router.delete("/:placeId",placesController.deletePlace);

module.exports = router;