const { v4: uuidv4 } = require('uuid');
const HttpError = require("../models/http-error");

const DUMMY_PLACES = [
    {
        id:'p1',
        title:'Calgary',
        description:'Calgary, uma cidade cosmopolita em Alberta com vários arranha-céus, deve seu rápido crescimento à condição de centro da indústria de petróleo do Canadá. No entanto, ela ainda está mergulhada na cultura western, que lhe valeu o apelido de "Cidade da vaca", evidente no Calgary Stampede, um grande festival de rodeio realizado em julho e que teve origem nas exposições agropecuárias organizadas no passado. ',
        imageUrl:'https://www.pictureperfectcleaning.ca/wp-content/uploads/2020/08/Calgary-aerial-pan-from-N.jpg',
        address:'Alberta',
        location:{
            lat:51.0271596,
            lng:-114.4174685
        },
        creator:'12'
    },
    {
        id:'p2',
        title:'Edmonton',
        description:'Calgary, uma cidade cosmopolita em Alberta com vários arranha-céus, deve seu rápido crescimento à condição de centro da indústria de petróleo do Canadá. No entanto, ela ainda está mergulhada na cultura western, que lhe valeu o apelido de "Cidade da vaca", evidente no Calgary Stampede, um grande festival de rodeio realizado em julho e que teve origem nas exposições agropecuárias organizadas no passado. ',
        imageUrl:'https://www.pictureperfectcleaning.ca/wp-content/uploads/2020/08/Calgary-aerial-pan-from-N.jpg',
        address:'Alberta',
        location:{
            lat:51.0271596,
            lng:-114.4174685
        },
        creator:'12'
    }
];

const getPlaceById = (req,res,next) => {

    const placeId = req.params.placeId;

    const place = DUMMY_PLACES.find(p => {
        return p.id === placeId
    });

    if(!place){
        throw new HttpError('Could not find a place for de provide id.',404);
    }  

    res.json({place});

};

const getPlacesByUser = (req,res,next)=>{

    const userId = req.params.userId;

    const place = DUMMY_PLACES.find(p => {
        return p.creator === userId
    });

    if(!place){
        return next(new HttpError('Could not find a place for de provide user id.',404)); 
    }  

    res.json({place});

};

const createPlace = (req,res,next) =>{
    const { title,description,location, address, creator } = req.body;

    const createPlace = {
        id:uuidv4(),
        title:title,
        description:description,
        location, location,
        address:address,
        creator:creator
    };

    DUMMY_PLACES.push(createPlace);

    res.status(201).json({place:createPlace});
}

const updatePlace = (req,res,next) =>{

    const { title,description, address } = req.body;

    const placeId = req.params.placeId;

    const updatePlace = {...DUMMY_PLACES.find(p => p.id === placeId)};

    const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId);

    updatePlace.title = title;
    updatePlace.description = description;
    updatePlace.address = address;

    DUMMY_PLACES[placeIndex] = updatePlace;

    res.status(200).json({place:updatePlace});
}

const deletePlace = (req,res,next) =>{
    
}

exports.getPlaceById = getPlaceById;
exports.getPlacesByUser = getPlacesByUser;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;