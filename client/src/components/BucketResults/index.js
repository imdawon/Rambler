import React from "react";
import { useStoreContext } from "../../utils/GlobalState";
import API from "../../utils/API";
import "./style.css";
import { ADD_LOG, REMOVE_BUCKETLIST } from "../../utils/actions";

function BucketResults() {
    const [state, dispatch] = useStoreContext();

    const setLog = (logHike) => {
        API.addToLog(state.googleId, logHike)
            .then(() => {
                dispatch({
                    type: ADD_LOG,
                    log: logHike
                });
            })
            .catch(err => console.log(err));
    };

    const removeHike = (hikeToRemoveID, hikeToRemove) => {
        API.removeBucketlistHike(state.googleId, hikeToRemove)
            .then(() => {
                dispatch({
                    type: REMOVE_BUCKETLIST,
                    bucketList: hikeToRemoveID
                });
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <ul className="hikeResultList cards">
                {state.bucketList.length > 0 && state.bucketList.map((hike, index) => (
                    <li key={index} className="hikeListItem cards_item">
                        <div className="card">
                            <div className="card_image">
                                <img className="card-img-top" src={hike.img} alt={hike.name} />
                            </div>
                            <div className="card_content is-centered">
                                <h2 className="card_title">{hike.name}</h2>
                                <p className="card_text">Location: {hike.location} </p>
                                <p className="card_text">Distance: {hike.length} miles</p>
                                <p className="card_text">Elevation Gain: {hike.ascent} feet</p>
                                <button className="btn card_btn bucketlist-add" onClick={() => {
                                    setLog(
                                        {
                                            id: hike.id,
                                            name: hike.name,
                                            location: hike.location,
                                            latitude: hike.latitude,
                                            longitude: hike.longitude,
                                            length: hike.length,
                                            ascent: hike.ascent,
                                            img: hike.img,
                                            summary: hike.summary,
                                            url: hike.url, 
                                            trailType: hike.trailType, 
                                            description: hike.description
                                        }
                                    )
                                }}>Add to Log</button>
                                <button className="btn card_btn remove-hike" onClick={() => removeHike(hike.id, hike)
                                }> Remove Hike </button>

                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default BucketResults;

