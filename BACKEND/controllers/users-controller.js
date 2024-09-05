const { v4: uuidv4 } = require('uuid');
const HttpError = require("../models/http-error");
const {validationResult} = require('express-validator');
const User = require('../models/users');

const getUsers = async (req,res,next) =>{

    let users;

    try {
        users = await User.find({},"-password");
    } catch (err) {
        const error = new HttpError("some wrong happen, try again!",500);
        return next(error);
    }

    res.json({users:users.map(user => user.toObject({ getters: true}))});
};

const signup = async (req,res,next) =>{

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return next(new HttpError('Invalid inputs passed, please check your data.',422)); 
    }

    const { name, email, password,places} = req.body;

    const existingUser = await User.findOne({ email:email});

    if(existingUser){
        const error = new HttpError('Could not create user, email already exists!',422);
        return next(error);
    }

    const createUser = new User({
        name:name,
        email:email,
        password: password,
        image:"https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png",
        places:places
    });

    try {
        await createUser.save();
    } catch (err) {
        console.log(err);
        const error = new HttpError("Error when try create a user, please try again!",500);
        return next(error);
    }

    res.status(201).json({user:createUser.toObject( { getters: true})});
};

const login = async (req,res,next) =>{

    const { email, password} = req.body;

    let identifiedUser;

    try {
        identifiedUser = await User.findOne({ email:email});
    } catch (err) {
        return next(new HttpError('Logging in failed, please try again!',500));
    }

    if(!identifiedUser || identifiedUser.password !== password){
        return next(new HttpError('Could not identify user, please try again!',401));
    }  

    res.json({message:'Logged in!'});
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;