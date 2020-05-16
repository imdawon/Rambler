import React, { useEffect } from "react";
import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_LOG } from "../utils/actions";
import API from "../utils/API";

function Log() {
    const [state, dispatch] = useStoreContext();

    useEffect(() => {
        generateLogData();
    }, []);

    const generateLogData = () => {
        API.getUserList(state.id)
            .then((hikes) => {
                console.log(hikes.data.log);
                let logListHikes = hikes.data.log;
                dispatch({
                    type: UPDATE_LOG,
                    log: logListHikes
                });
            })
            .catch(err => console.log(err));
    };

    return (
        <p>Log</p>
        
    );
}

export default Log;