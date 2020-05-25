import React, { useEffect } from 'react';
import "./index.css"
import { useStoreContext } from "../../utils/GlobalState";
import { SET_ACTION_NOTIFICATION } from '../../utils/actions';

function ActionNotification() {

    const [state, dispatch] = useStoreContext();
    // Listen for the event.
    window.addEventListener('runNotification', function (event) {
        // update state value of actionNotification to the message generated from the button that was clicked on SearchResults
        executeDispatch(JSON.stringify(event.detail))

        // after 3 seconds, clear the notification message value from state
        setTimeout(function () {
            executeDispatch('');
        }, 5000)
    },
    );
    return (
        (state.actionNotification === "")
            ? <h6></h6>

            : <div className="notification is-primary">
                <button className="delete"></button>
                {state.actionNotification}
            </div>
    )

    function executeDispatch(actionNotificationValue) {
        dispatch({
            type: SET_ACTION_NOTIFICATION,
            actionNotification: actionNotificationValue
        })
    }
}
export default ActionNotification;