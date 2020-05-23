import React, { useEffect } from 'react';
import "./index.css"
import { useStoreContext } from "../../utils/GlobalState";
import { SET_ACTION_NOTIFICATION } from '../../utils/actions';

function ActionNotification() {
    const [state, dispatch] = useStoreContext();
    // Listen for the event.
    window.addEventListener('runNotification', function (event) {
        dispatch({
            type: SET_ACTION_NOTIFICATION,
            actionNotification: JSON.stringify(event.detail)
        })
    }, false);

    useEffect(() => {
        console.log("ActionNotification Enabled!")
    }, [])
    return (
        (state.actionNotification === "")
            ? <h6></h6>

            : <div className="notification is-primary">
            <button className="delete"></button>
            {state.actionNotification}
        </div>
    )
}
export default ActionNotification;