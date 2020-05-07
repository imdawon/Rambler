import React, { useContext } from "react";
import HikeContext from "../../utils/HikeContext";
import "./style.css";

function SearchResults(props) {
    const hikeData = useContext(HikeContext)
    console.log("search result props", hikeData);
    return (
        <div>
        <ul className="hikeResultList">
        {hikeData.map(hike => (
            <li key={hike.id} className="hikeListItem">
            <p>Name: {hike.name}</p>
            <p>Location: {hike.location} </p>
            <p>Distance: {hike.length}</p>
            <p>Elevation Gain: {hike.ascent}</p>
            <img src={hike.imgSmall} alt={hike.name} />
            <button className='bucketlist-add' 
            onClick={() => {props.addHikeToBucketList(
                {"id": hike.id, 
                "name": hike.name, 
                "location": hike.location, 
                "length": hike.length, 
                "ascent": hike.ascent, 
                "img": hike.imgSmall}
                )}}
            >
            Bucket List
            </button>
            </li>
        ))}
        </ul>

        </div>
    )
};

export default SearchResults;