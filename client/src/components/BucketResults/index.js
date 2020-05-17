import React, { useEffect } from "react";
import { useStoreContext } from "../../utils/GlobalState";
import API from "../../utils/API";
import "./style.css";
import { ADD_LOG } from "../../utils/actions";

function BucketResults() {
    const [state, dispatch] = useStoreContext();

    useEffect(() => {
        console.log(state.bucketList[0])
    })

    const setLog = (logHike) => {
        console.log(logHike)

        API.addToLog(state.id, logHike)
            .then(res => console.log("Updated log", res.data))
            .catch(err => console.log(err));

        dispatch({
            type: ADD_LOG,
            log: logHike
        });
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
                                            img: hike.imgMedium,
                                            summary: hike.summary,
                                            url: hike.url
                                        }
                                    )
                                }}>Add to Log</button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default BucketResults;

