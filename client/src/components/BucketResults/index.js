import React from "react";
import { useStoreContext } from "../../utils/GlobalState";
import { Link } from "react-router-dom";
import API from '../../utils/API';
import "./style.css";
import ButtonLogAdd from '../ButtonLogAdd';
import ButtonDeleteBucket from '../ButtonDeleteBucket';
import ButtonDetail from '../ButtonDetails';
import createNotificationEvent from "../../utils/createNotificationEvent";
import { SET_CURRENT_HIKE, ADD_LOG, REMOVE_BUCKETLIST } from "../../utils/actions";
import emptyImage from "../../assets/emptyTrailImage.jpg"
function BucketResults() {
    const [state, dispatch] = useStoreContext();

    const setCurrentHike = (hike) => {
        console.log(hike);
        dispatch({
            type: SET_CURRENT_HIKE,
            currentHike: hike
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
    const removeHike = (hikeToRemoveID, hikeToRemove) => {
        createNotificationEvent('Removed from Bucket List!')
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
                                {(hike.imgMedium !== ""
                                    ?
                                    <img className="card-img-top" src={hike.imgMedium} alt={hike.name} />
                                    :
                                    <img className="card-img-top" src={emptyImage} alt={hike.name} />
                                )}
                            </div>
                            <div className="card_content is-centered">
                                <h2 className="card_title">{hike.name}</h2>
                                <p className="card_text">Location: {hike.location} </p>
                                <p className="card_text">Distance: {hike.length} miles</p>
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
                                            })} />
                                </Link>
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
                                    }} />
                                <ButtonDeleteBucket
                                    hike={hike}
                                    onClick={() => removeHike(hike.id, hike)
                                    } />
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default BucketResults;

