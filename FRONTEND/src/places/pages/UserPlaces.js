import React,{useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import PlaceList from '../components/PlaceList';

const UserPlaces = () => {

    const [loadedPlaces, setLoadedPlaces] = useState();
    const {isLoading, error ,sendRequest, clearError} = useHttpClient();

    const userId = useParams().userId;

    useEffect(()=>{
        const fetchPlaces = async () => {
            try {
                const response = await sendRequest(
                    `http://localhost:5000/api/places/user/${userId}`
                );
                setLoadedPlaces(response.places);
            } catch (error) {}
        };
        fetchPlaces();
    },[sendRequest,userId]);

    return  <React.Fragment>
                <ErrorModal error={error} onClear={clearError} />
                { isLoading && <div className="center">
                    <LoadingSpinner />
                    </div>}
                {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces}></PlaceList>}
            </React.Fragment>
}

export default UserPlaces;