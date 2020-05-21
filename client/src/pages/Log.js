import LineChart from "../components/LineChart";
import BarChart from "../components/BarChart";
import React, { useEffect } from "react";
import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_LOG } from "../utils/actions";
import API from "../utils/API";
import LogResults from "../components/LogResults";

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
        ? <div>
        <p>Log</p>
         <LineChart /> 
        <BarChart /> 
        <LogResults />
        </div>
        : 
        <h3>Get out on the trail and log some hikes!</h3>
        
    );
}

export default Log;