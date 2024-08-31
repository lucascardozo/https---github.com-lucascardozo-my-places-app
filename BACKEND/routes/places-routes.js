const express = require('express');
const HttpError = require("../models/http-error");

const router = express.Router(); 

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

router.get("/:placeId",(req,res,next)=>{

    const placeId = req.params.placeId;

    const place = DUMMY_PLACES.find(p => {
        return p.id === placeId
    });

    if(!place){
        throw new HttpError('Could not find a place for de provide id.',404);
    }  

    res.json({place});

});

router.get("/user/:userId",(req,res,next)=>{

    const userId = req.params.userId;

    const place = DUMMY_PLACES.find(p => {
        return p.creator === userId
    });

    if(!place){
        return next(new HttpError('Could not find a place for de provide user id.',404)); 
    }  

    res.json({place});

});

module.exports = router;