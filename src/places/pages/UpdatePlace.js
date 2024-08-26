import React, {useEffect,useState} from 'react';
import { useParams } from 'react-router-dom';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from "../../shared/util/validators";
import { useForm } from '../../shared/hooks/form-hook';
import './PlaceForm.css';

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

const UpdatePlace = () => {

    const [isLoading, setIsLoading] = useState(true);

    const placeId = useParams().placeId;

    const [formState, inputHandler, setFormData] = useForm({
        title:{
            value:'',
            isValid:false
        },
        description:{
            value:'',
            isValid:false
        },
        address:{
            value:'',
            isValid:false
        },
    },false);

    const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId);

    useEffect(() => {

        setFormData({
            title:{
                value:identifiedPlace.title,
                isValid:true
            },
            description:{
                value:identifiedPlace.description,
                isValid:true
            },
            address:{
                value:identifiedPlace.address,
                isValid:true
            }
        }, true);
        setIsLoading(false);
    }, [setFormData, identifiedPlace]);

    const placeSubmitHandler = event =>{
        event.preventDefault();

        console.log(formState.inputs);
    };

    if(!identifiedPlace){
        return (
            <div className='center'>
                <h2>Could not find place!</h2>
            </div>
            );
    }

    if(isLoading){
        return (
            <div className='center'>
                <h2>Loading...</h2>
            </div>
            );
    }

    return <form className="place-form" onSubmit={placeSubmitHandler}>
        <Input 
            id="title"
            element="input" 
            type="text" 
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title"
            onInput={inputHandler}
            initialValue={formState.inputs.title.value}
            initialValid={formState.inputs.title.isValid} />
        <Input
            id="description" 
            element="textarea" 
            label="Description"
            validators={[VALIDATOR_MINLENGTH(10)]}
            errorText="Please enter a valid description"
            onInput={inputHandler}
            initialValue={formState.inputs.description.value}
            initialValid={formState.inputs.description.isValid} />

        <Input
            id="address" 
            element="input" 
            label="Address"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid address"
            onInput={inputHandler}
            initialValue={formState.inputs.address.value}
            initialValid={formState.inputs.address.isValid} />

        <Button type="submit" disabled={!formState.isValid} >
            EDIT PLACE
        </Button>
    </form>
};

export default UpdatePlace;