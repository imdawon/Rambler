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
        // set state.message to e.detail
        // setTimeout(//set state to false ,3000)
     }, false);

    useEffect(() => {
        console.log("ActionNotification Enabled!")
    }, [])
    return (

        <div className="notification is-primary">
            <button className="delete"></button>
           { state.actionNotification }
        </div>
    
    )
    }
export default ActionNotification;