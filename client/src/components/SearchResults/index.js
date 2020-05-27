import React from "react";
import { useStoreContext } from "../../utils/GlobalState";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import "./style.css";
import ButtonLogAdd from "../ButtonLogAdd";
import ButtonBucketAdd from '../ButtonBucketAdd';
import ButtonDetail from '../ButtonDetails';
import ButtonLoadMore from '../ButtonLoadMore';
import { SET_CURRENT_HIKE, ADD_BUCKETLIST, ADD_LOG } from "../../utils/actions";
import emptyImage from "../../assets/emptyTrailImage.jpg";
import createNotificationEvent from "../../utils/createNotificationEvent";

function SearchResults() {
    const [state, dispatch] = useStoreContext();
    const setCurrentHike = (hike) => {
        console.log(hike);
        dispatch({
            type: SET_CURRENT_HIKE,
            currentHike: hike
        });
    };
    const setBucketList = (bucketListHike) => {
        createNotificationEvent('Added to Bucket List!')

        console.log(`bucketListHike value: ${bucketListHike}`);

        API.addToBucketList(state.googleId, bucketListHike)
            .then(res => console.log("Updated Bucket List", res.data))
            .catch(err => console.log(err));

        dispatch({
            type: ADD_BUCKETLIST,
            bucketList: bucketListHike
        });
    };
    const setLog = (logHike) => {
        createNotificationEvent('Added to Hike Log!')

        API.addToLog(state.googleId, logHike)
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
                {state.hikes.slice(0, state.visibleIndex).map((hike, i) => (
                    <li key={i} className="hikeListItem cards_item">
                        <div className="card">
                        <div className="card_image">
                            {(hike.imgMedium !== "" 
                            ? 
                            <img className="card-img-top" src={hike.imgMedium} alt={hike.name} />
                            : 
                            <img className="card-img-top" src={emptyImage} alt={hike.name} />
                            )}
                            </div>
                            {/* <div className="card_image">
                                <img className="card-img-top" src={hike.imgMedium} alt={hike.name} />
                            </div> */}
                            <div className="card_content is-centered">
                                <h2 className="card_title">{hike.name}</h2>
                                <p className="card_text">Location: {hike.location} </p>
                                <p className="card_text">Distance: {hike.length} miles {hike.trailType}</p>
                                <p className="card_text">Elevation Gain: {hike.ascent} feet</p>
                                <Link to={"/hike_details/" + hike.id}>
                                    <ButtonDetail
                                        hike={hike}
                                        onClick={() => setCurrentHike(
                                            {
                                                id: hike.id,
                                                name: hike.name,
                                                location: hike.location,
                                                latitude: hike.latitude,
                                                longitude: hike.longitude,
                                                length: hike.length,
                                                ascent: hike.ascent,
                                                imgMedium: hike.imgMedium,
                                                summary: hike.summary,
                                                url: hike.url,
                                                trailType: hike.trailType,
                                                description: hike.description
                                            }
                                        )
                                        }
                                    />
                                </Link>
                                <ButtonBucketAdd
                                    hike={hike}
                                    onClick={() => {
                                        setBucketList(
                                            {
                                                id: hike.id,
                                                name: hike.name,
                                                location: hike.location,
                                                latitude: hike.latitude,
                                                longitude: hike.longitude,
                                                length: hike.length,
                                                ascent: hike.ascent,
                                                imgMedium: hike.imgMedium,
                                                summary: hike.summary,
                                                url: hike.url,
                                                trailType: hike.trailType,
                                                description: hike.description
                                            }
                                        )
                                    }} />
                                <ButtonLogAdd
                                    hike={hike}
                                    onClick={() => {
                                        setLog(
                                            {
                                                id: hike.id,
                                                name: hike.name,
                                                location: hike.location,
                                                latitude: hike.latitude,
                                                longitude: hike.longitude,
                                                length: hike.length,
                                                ascent: hike.ascent,
                                                imgMedium: hike.imgMedium,
                                                summary: hike.summary,
                                                url: hike.url,
                                                trailType: hike.trailType,
                                                description: hike.description
                                            }
                                        )
                                    }}/>
                            </div>
                        </div>
                    </li>
                ))}
                
            </ul>
            {state.visibleIndex < state.paginationHikes.length &&
                <ButtonLoadMore />
             }
            <br />
            <br /><br /><br /><br /><br />
        </div>
    )
};

export default SearchResults;

