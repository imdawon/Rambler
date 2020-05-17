import React, { useEffect } from "react";
import { useStoreContext } from "../../utils/GlobalState";
import API from "../../utils/API";
import "./style.css";
import { ADD_LOG } from "../../utils/actions";

function LogResults() {
    const [state, dispatch] = useStoreContext();

    useEffect(() => {
        console.log(state.log)
    })



    return (

        <div>
            <ul className="hikeResultList cards">

                {state.log.length > 0 && state.log.map((hike, index) => (
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
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default LogResults;

