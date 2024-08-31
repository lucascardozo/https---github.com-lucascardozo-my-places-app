import React from "react";
import { useParams } from "react-router-dom";

import PlaceList from '../components/PlaceList';

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

const UserPlaces = () => {

    const userId = useParams().userId;
    const loaderPlaces = DUMMY_PLACES.filter( place => place.creator === userId);

    return <PlaceList items={loaderPlaces}></PlaceList>;
}

export default UserPlaces;