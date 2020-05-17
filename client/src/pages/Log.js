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
        API.getUserList(state.id)
            .then((hikes) => {
                console.log("mongo", hikes.data.log);
                let logListHikes = hikes.data.log;
                dispatch({
                    type: UPDATE_LOG,
                    log: logListHikes
                });
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
        <p>Log</p>
        <LineChart />
        <BarChart />
        <LogResults />
        </div>

    );
}

export default Log;