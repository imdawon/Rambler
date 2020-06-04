import LineChart from "../components/LineChart";
import BarChart from "../components/BarChart";
import React, { useEffect } from "react";
import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_LOG, UPDATE_LINE_CHART, UPDATE_BAR_CHART } from "../utils/actions";
import API from "../utils/API";
import LogResults from "../components/LogResults";
import takeAHike from "../assets/takeAHike.png";
import log from "../assets/log.jpg";

function Log() {
    const [state, dispatch] = useStoreContext();
// on page load get user log data from database
    useEffect(() => {
        generateLogData();
    }, []);

    const generateLogData = () => {
        API.getUserList(state.googleId)
            .then((hikes) => {
                let logListHikes = hikes.data.log;
                dispatch({
                    type: UPDATE_LOG,
                    log: logListHikes
                });
                dispatch({
                    type: UPDATE_LINE_CHART,
                    lineChart: logListHikes
                });
                dispatch({
                    type: UPDATE_BAR_CHART,
                    barChart: logListHikes
                });
            })
            .catch(err => console.log(err));
    };
// if user has nothing in their log display go hike! image
    return (
        (state.log.length > 0) 
        ? 
        <div>
        <img id="logImage" src={log} />
        <LineChart />
        <BarChart/>   
        <LogResults />
        </div>
        : <div>
        <h2>Get out on the trail and log some hikes!</h2>
        <img id="emptyLog" src={takeAHike} />
        </div>
    );
};

export default Log;