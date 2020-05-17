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
        <LogResults />
        </div>
    );
}

export default Log;