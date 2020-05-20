import React from "react";
import { useStoreContext } from "../../utils/GlobalState";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import "./style.css";
import { ADD_BUCKETLIST, ADD_LOG, SET_CURRENT_HIKE } from "../../utils/actions";

function SearchResults() {
    const [state, dispatch] = useStoreContext();

    const setBucketList = (bucketListHike) => {
      console.log(bucketListHike)

      API.addToBucketList(state.googleId, bucketListHike)
      .then(res => console.log("Updated bucket list", res.data))
      .catch(err => console.log(err));

        dispatch({
            type: ADD_BUCKETLIST,
            bucketList: bucketListHike
        });
    };

    const setLog = (logHike) => {
        console.log(logHike)

        API.addToLog(state.googleId, logHike)
        .then(res => console.log("Updated log", res.data))
        .catch(err => console.log(err));
        
        dispatch({
            type: ADD_LOG,
            log: logHike
        });
    };

    const setCurrentHike = (hike) => {
        console.log(hike);
        dispatch({
            type: SET_CURRENT_HIKE,
            currentHike: hike
        });
    };

    return (
        <div>
        <ul className="hikeResultList cards">
            {state.hikes.map(hike => (
                <li key={hike.id} className="hikeListItem cards_item">
                    <div className="card">
                        <div className="card_image">
                            <img className="card-img-top" src={hike.imgMedium} alt={hike.name} />
                        </div>
                        <div className="card_content is-centered">
                            <h2 className="card_title">{hike.name}</h2>
                            <p className="card_text">Location: {hike.location} </p>
                            <p className="card_text">Distance: {hike.length} miles {hike.trailType}</p>
                            <p className="card_text">Elevation Gain: {hike.ascent} feet</p>
                            <Link to={"/hike_details/" + hike.id}><button className="btn card_btn bucketlist-add" 
                            onClick={() => {setCurrentHike( 
                                {
                                    id: hike.id, 
                                    name: hike.name, 
                                    location: hike.location,  
                                    latitude: hike.latitude,
                                    longitude: hike.longitude,
                                    length: hike.length, 
                                    ascent: hike.ascent, 
                                    img: hike.imgMedium,
                                    summary: hike.summary,
                                    url: hike.url,
                                    trailType: hike.trailType,
                                    description: hike.description
                                }
                            )}}>Details</button></Link>
                            <button className="btn card_btn bucketlist-add" onClick={() => {setBucketList(
                                {
                                    id: hike.id, 
                                    name: hike.name, 
                                    location: hike.location,  
                                    latitude: hike.latitude,
                                    longitude: hike.longitude,
                                    length: hike.length, 
                                    ascent: hike.ascent, 
                                    img: hike.imgMedium,
                                    summary: hike.summary,
                                    url: hike.url,
                                    trailType: hike.trailType,
                                    description: hike.description
                                }
                            )}}>Add to Bucket List</button>
                            <button className="btn card_btn bucketlist-add" onClick={() => {setLog(
                                {
                                    id: hike.id, 
                                    name: hike.name, 
                                    location: hike.location,  
                                    latitude: hike.latitude,
                                    longitude: hike.longitude,
                                    length: hike.length, 
                                    ascent: hike.ascent, 
                                    img: hike.imgMedium,
                                    summary: hike.summary,
                                    url: hike.url,
                                    trailType: hike.trailType,
                                    description: hike.description
                                }
                            )}}>Add to Log</button>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
        </div>    )
};

export default SearchResults;

