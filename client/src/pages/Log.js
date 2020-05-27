import LineChart from "../components/LineChart";
import BarChart from "../components/BarChart";
import React, { useEffect } from "react";
import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_LOG } from "../utils/actions";
import API from "../utils/API";
import LogResults from "../components/LogResults";
import takeAHike from "../assets/takeAHike.png";
import log from "../assets/log.jpg";

function Log() {
    const [state, dispatch] = useStoreContext();

    useEffect(() => {
        generateLogData();
    }, []);

    useEffect(() => {
        console.log("state", state.log)
    }, [state]);

    const generateLogData = () => {
        API.getUserList(state.googleId)
            .then((hikes) => {
                let logListHikes = hikes.data.log;
                dispatch({
                    type: UPDATE_LOG,
                    log: logListHikes
                });
            })
            .catch(err => console.log(err));
    };

    return (
        
        (state.log.length > 0) 
        ? 
        <div>
        <img id="logImage" src={log} />
        <BarChart/>   
        <LineChart /> 
        <LogResults />
        </div>
        : <div>
        <h2>Get out on the trail and log some hikes!</h2>
        <img id="emptyLog" src={takeAHike} />
        </div>
        
        
    );
}

export default Log;