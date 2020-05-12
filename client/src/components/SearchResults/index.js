import React, { useContext } from "react";
import HikeContext from "../../utils/HikeContext";
import "./style.css";

function SearchResults(props) {
    const hikeData = useContext(HikeContext)
    console.log("search result props", hikeData);
    return (
        <div>
        <ul className="hikeResultList cards">
        {hikeData.map(hike => (
            <li key={hike.id} className="hikeListItem cards_item">
            <div className="card">
                <div className="card_image">
                    <img className="card-img-top" src={hike.imgSmall} alt={hike.name} />
                </div>
                <div className="card_content is-centered">
                        <h2 className="card_title">{hike.name}</h2>
                        <p className="card_text">Location: {hike.location} </p>
                        <p className="card_text">Distance: {hike.length} miles</p>
                        <p className="card_text">Elevation Gain: {hike.ascent} feet</p>
                        <button className="btn card_btn bucketlist-add" onClick={() => {props.setBucketList(
                            {"id": hike.id, 
                            "name": hike.name, 
                            "location": hike.location, 
                            "length": hike.length, 
                            "ascent": hike.ascent, 
                            "img": hike.imgSmall}
                            )}}>Add to Bucket List</button>
                        <button className="btn card_btn">Add to Log Book</button>
                </div>
            </div>
            </li>
        ))}
        </ul>

        </div>
    )
};

export default SearchResults;