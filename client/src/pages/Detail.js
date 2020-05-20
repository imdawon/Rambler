import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useStoreContext } from "../utils/GlobalState";


const Detail = () => {
    const [state, dispatch] = useStoreContext();
    const { id } = useParams()



    return (
        <div>
            <p>Details</p>
            <div className="card_image">
                <img className="card-img-top" src={state.currentHike.img} alt={state.currentHike.name} />
            </div>
            <h2>{state.currentHike.name}</h2>
            <p>Location: {state.currentHike.location} </p>
            <p>Distance: {state.currentHike.length} miles {state.currentHike.trailType}</p>
            <p>Elevation Gain: {state.currentHike.ascent} feet</p>
            <p>{state.currentHike.description}</p>
            <Link to="/"><span>← Back to Search</span></Link>
        </div>
    );
}

export default Detail;


