import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useStoreContext } from "../utils/GlobalState";
import API from "../utils/API";
import { ADD_BUCKETLIST, ADD_LOG } from "../utils/actions";
import Weather from '../components/Weather';
import ButtonLogAdd from '../components/ButtonLogAdd';
import ButtonBucketAdd from '../components/ButtonBucketAdd';
import createNotificationEvent from "../utils/createNotificationEvent";
import "../index.css";
import emptyImage from "../assets/emptyTrailImage.jpg"


const Detail = () => {
    const [state, dispatch] = useStoreContext();
// add user bucket list hike to database
    const setBucketList = (bucketListHike) => {
        console.log(bucketListHike)
        createNotificationEvent('Added to Bucket List!')
  
        API.addToBucketList(state.googleId, bucketListHike)
            .then(res => console.log("Updated Bucket List", res.data))
            .catch(err => console.log(err));

        dispatch({
            type: ADD_BUCKETLIST,
            bucketList: bucketListHike
        });
    };
    // add user log hike to database
    const setLog = (logHike) => {
        console.log(logHike)

        createNotificationEvent('Added to your Hike Log!')

        API.addToLog(state.googleId, logHike)
            .then(res => console.log("Updated log", res.data))
            .catch(err => console.log(err));

        dispatch({
            type: ADD_LOG,
            log: logHike
        });
    };
// display the current hike detils and weather conditions
    return (
        (state.currentHike.id)
            ?
            <div>
                <div className="card" id="detail_card">
                    <div className="card_image">
                        {(state.currentHike.imgMedium !== "")
                            ?
                            <img className="card-img-top" id="detailImage" src={state.currentHike.imgMedium} alt={state.currentHike.name} />
                            :
                            <img className="card-img-top" id="detailImage" src={emptyImage} alt={state.currentHike.name} />
                       }
                    </div>
                    <div className="card_content is-centered">
                        <h1 id="detail_name" className="detail_card card_title">{state.currentHike.name}</h1>
                        <h2 className="detail_card card_text ">Location: {state.currentHike.location} </h2>
                        <h2 className="detail_card card_text ">Distance: {state.currentHike.length} miles {state.currentHike.trailType}</h2>
                        <h2 className="detail_card card_text ">Elevation Gain: {state.currentHike.ascent} feet</h2>
                        <h6 className="detail_card card_text ">{state.currentHike.description}</h6>
                    </div>
                </div>
                <br />
                <br/>
                <ButtonBucketAdd
                    detail={"true"}
                    hike={state.currentHike}
                    onClick={() => {
                        setBucketList(
                            {
                                id: state.currentHike.id,
                                name: state.currentHike.name,
                                location: state.currentHike.location,
                                latitude: state.currentHike.latitude,
                                longitude: state.currentHike.longitude,
                                length: state.currentHike.length,
                                ascent: state.currentHike.ascent,
                                imgMedium: state.currentHike.imgMedium,
                                summary: state.currentHike.summary,
                                url: state.currentHike.url,
                                trailType: state.currentHike.trailType,
                                description: state.currentHike.description
                            }
                        )
                    }} />
                <br />
                <ButtonLogAdd
                    detail={"true"}
                    hike={state.currentHike}
                    onClick={() => {
                        setLog(
                            {
                                id: state.currentHike.id,
                                name: state.currentHike.name,
                                location: state.currentHike.location,
                                latitude: state.currentHike.latitude,
                                longitude: state.currentHike.longitude,
                                length: state.currentHike.length,
                                ascent: state.currentHike.ascent,
                                imgMedium: state.currentHike.imgMedium,
                                summary: state.currentHike.summary,
                                url: state.currentHike.url,
                                trailType: state.currentHike.trailType,
                                description: state.currentHike.description
                            }
                        )
                    }} />
                <Weather />

            </div>
            :
            <h1 style={{textAlign: "center",}}>Hike Not Found</h1>
    );
};

export default Detail;


