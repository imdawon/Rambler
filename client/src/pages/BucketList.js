import React, { useEffect } from "react";
import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_BUCKETLIST, ADD_LOG } from "../utils/actions";
import API from '../utils/API';

function BucketList() {
    const [state, dispatch] = useStoreContext();


    useEffect(() => {
        generateBucketListData();
    }, []);

    const generateBucketListData = () => {
        API.getUserList(state.id)
            .then((hikes) => {
                console.log(hikes.data.bucketlist)
                let bucketListHikes = hikes.data.bucketlist
                dispatch({
                    type: UPDATE_BUCKETLIST,
                    bucketlist: bucketListHikes
                });
            })
            .then(() => {
                console.log(state.bucketList[0])
                // renderBucketList()
            })
            .catch(err => console.log(err));
    };

    // const renderBucketList = () => {
    //     console.log(state.bucketList)

    //     if (state.bucketList[0].name !== "") {
    //        return ( 
    //            <ul>
    //             {state.bucketList[0].map((hike, index) => (
    //                 <li key={index} className="hikeListItem cards_item">
    //                     <p>{hike.name}</p>
    //                 </li>
    //             ))}
    
    //         </ul>
    //        )
    //     }
    //     console.log(state.bucketList)
    // }

    // const setLog = (logHike) => {
    //     console.log(logHike)

    //     API.addToLog(state.id, logHike)
    //         .then(res => console.log("Updated log", res.data))
    //         .catch(err => console.log(err));

    //     dispatch({
    //         type: ADD_LOG,
    //         log: logHike
    //     });
    // };

    return (

        <div>
            <p>BucketList</p>
            <ul />
        </div>

    )
}

export default BucketList;


// <button className="btn card_btn bucketlist-add" onClick={() => {
//     setLog(
//         {
//             id: hike.id,
//             name: hike.name,
//             location: hike.location,
//             latitude: hike.latitude,
//             longitude: hike.longitude,
//             length: hike.length,
//             ascent: hike.ascent,
//             img: hike.imgMedium,
//             summary: hike.summary,
//             url: hike.url
//         }
//     )
// }}>Add to Log</button>


// <div className="card">
// <div className="card_image">
//     <img className="card-img-top" src={hike.imgMedium} alt={hike.name} />
// </div>
// <div className="card_content is-centered">
//     <h2 className="card_title">{hike.name}</h2>
//     <p className="card_text">Location: {hike.location} </p>
//     <p className="card_text">Distance: {hike.length} miles</p>
//     <p className="card_text">Elevation Gain: {hike.ascent} feet</p>

// </div>
// </div>