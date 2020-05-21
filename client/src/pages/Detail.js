import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useStoreContext } from "../utils/GlobalState";
import API from "../utils/API";
import { ADD_BUCKETLIST, ADD_LOG } from "../utils/actions";
import Weather from '../components/Weather';


const Detail = () => {
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
  
    return (
        (state.currentHike.id)
        ?
        <div>
            <p>Details</p>
            <div className="card_image">
                <img className="card-img-top" src={state.currentHike.img} alt={state.currentHike.name} />
            </div>
            <h2>{state.currentHike.name}</h2>
            <p>Location: {state.currentHike.location} </p>
            <p>Distance: {state.currentHike.length} miles {state.currentHike.trailType}</p>
            <p>Elevation Gain: {state.currentHike.ascent} feet</p>
            <h6>{state.currentHike.description}</h6>
            <button className="btn card_btn bucketlist-add" onClick={() => {setBucketList(
                {
                    id: state.currentHike.id, 
                    name: state.currentHike.name, 
                    location: state.currentHike.location,  
                    latitude: state.currentHike.latitude,
                    longitude: state.currentHike.longitude,
                    length: state.currentHike.length, 
                    ascent: state.currentHike.ascent, 
                    img: state.currentHike.img,
                    summary: state.currentHike.summary,
                    url: state.currentHike.url,
                    trailType: state.currentHike.trailType,
                    description: state.currentHike.description
                }
            )}}>Add to Bucket List</button>
            <button className="btn card_btn bucketlist-add" onClick={() => {setLog(
                {
                    id: state.currentHike.id, 
                    name: state.currentHike.name, 
                    location: state.currentHike.location,  
                    latitude: state.currentHike.latitude,
                    longitude: state.currentHike.longitude,
                    length: state.currentHike.length, 
                    ascent: state.currentHike.ascent, 
                    img: state.currentHike.img,
                    summary: state.currentHike.summary,
                    url: state.currentHike.url,
                    trailType: state.currentHike.trailType,
                    description: state.currentHike.description
                }
            )}}>Add to Log</button>
            <Weather />
        </div>
        : 
        <h3>Hike Not Found</h3>
    );
}

export default Detail;


