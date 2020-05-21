import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useStoreContext } from "../utils/GlobalState";
import API from "../utils/API";
import { ADD_BUCKETLIST, ADD_LOG } from "../utils/actions";
import Weather from '../components/Weather';
import "../index.css";


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
            <h2>Details</h2>
                <img id="detailImage" src={state.currentHike.img} alt={state.currentHike.name} />
            
            <h2>{state.currentHike.name}</h2>
            <p>Location: {state.currentHike.location} </p>
            <p>Distance: {state.currentHike.length} miles {state.currentHike.trailType}</p>
            <p>Elevation Gain: {state.currentHike.ascent} feet</p>
            <h6>{state.currentHike.description}</h6>
            <button id="detailButton" className="btn bucketlist-add button is-success is-light" onClick={() => {setBucketList(
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
            )}}><span class="icon is-small">
      <i class="fa fa-check"></i>
    </span>Add to Bucket List</button>
            <button id="detailButton" className="bucketlist-add button is-success is-light" onClick={() => {setLog(
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
            )}}>
            <span class="icon is-small">
            <i class="fa fa-check"></i>
            </span>
            <span>Add to Log</span>
            </button>
            <Weather />
        </div>
        : 
        <h3>Hike Not Found</h3>
    );
}

export default Detail;


