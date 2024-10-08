const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const {validationResult} = require('express-validator');
const HttpError = require("../models/http-error");
const getCoordsForAddress = require('../util/location');
const Place = require('../models/places');
const User = require('../models/users');
const mongoose = require('mongoose');

const getPlaceById = async (req,res,next) => {

    const placeId = req.params.placeId;

    let place;

    try {
        place = await Place.findById(placeId);
    } catch (err) {
        const error = new HttpError("Something went wrong, could not find a place!",500);
        return next(error);
    }

    if(!place){
        const error = new HttpError('Could not find a place for de provide id.',404);
        return next(error);
    } 

    res.json({place: place.toObject({ getters: true})});

};

const getPlacesByUser = async (req,res,next)=>{

    const userId = req.params.userId;

    let places;

    try {
        places = await Place.find({ creator:userId });
    } catch (err) {
        const error = new HttpError("Something went wrong, could not find some place!",500);
        return next(error);
    }

    if(!places || places.length === 0){
        return next(new HttpError('Could not find places for de provide user id.',404)); 
    } 

    res.json({places: places.map(place => place.toObject({ getters: true}))});
};

const createPlace = async (req,res,next) =>{

    const errors = validationResult(req);

    if(!errors.isEmpty()){
       return next(new HttpError('Invalid inputs passed, please check your data.',422)); 
    }
    
    const { title,description, address, creator } = req.body;

    let coordinates;
    try {
        coordinates = await getCoordsForAddress(address);
    } catch (error) {
        return next(error);
    }

    const createPlace = new Place({
        title:title,
        description:description,
        location: coordinates,
        address:address,
        image: req.file.path,
        creator:creator
    });

    let user;

    try {
        user = await User.findById(creator);
    } catch (err) {
        const error = new HttpError("Create a place failed, please try again!",500);
        return next(error);
    }

    if(!user){
        const error = new HttpError("Could not find user for provided id.",404);
        return next(error);
    }

    try{
        
        const session = await mongoose.startSession();
        session.startTransaction();
        await createPlace.save({ session });
        user.places.push(createPlace);
        await user.save({ session });
        await session.commitTransaction();

    }catch(err){
        console.log(err);
        const error = new HttpError("Create a place failed, please try again!",500);
        return next(error);
    }

    res.status(201).json({place:createPlace});
}

const updatePlace = async (req,res,next) =>{

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return next(new HttpError('Invalid inputs passed, please check your data.',422)); 
    }
    
    const { title,description, address } = req.body;

    const placeId = req.params.placeId;

    let place;

    try {
        place = await Place.findById(placeId);
    } catch (err) {
        const error = new HttpError("Something went wrong, could not update the record!",500);
        return next(error);
    }

    const oldImagePath = place.image;

    let newImagePath = oldImagePath;

    if (req.file && req.file.path) {
        newImagePath = req.file.path;
    }

    place.title = title;
    place.description = description;
    place.address = address;
    place.image = newImagePath;
    
    try {
        await place.save();
    } catch (error) {
        const errorSave = new HttpError("Something went wrong, could not update the record!",500);
        return next(errorSave);
    }

    if (newImagePath !== oldImagePath && oldImagePath) {
        fs.unlink(oldImagePath, err => {
            if (err) {
                console.error('Error deleting old image:', err);
            }
        });
    }

    res.status(200).json({place:place.toObject({ getters:true})});
}

const deletePlace = async (req,res,next) =>{

    const placeId = req.params.placeId;

    let place;

    try {
        place = await Place.findById(placeId).populate('creator');
    } catch (err) {
        const error = new HttpError("Something went wrong!",500)
        return next(error);
    }

    if(!place){
        const error = new HttpError("Could not find the place "+placeId,404)
        return next(error);
    }

    const imagePath = place.image;

    try{
        
        const session = await mongoose.startSession();
        session.startTransaction();
        await place.deleteOne({ session });
        place.creator.places.pull(place);
        await place.creator.save({ session });
        await session.commitTransaction();

    }catch(err){
        console.log(err);
        const error = new HttpError("Something went wrong, could not delete the place!",500);
        return next(error);
    }

    fs.unlink(imagePath, err => {
        console.log(err);
    });

    res.status(200).json({ message: 'Deleted place '+placeId+'.'});
}

exports.getPlaceById = getPlaceById;
exports.getPlacesByUser = getPlacesByUser;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;