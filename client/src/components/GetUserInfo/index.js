import React, { useEffect } from 'react';
import axios from 'axios';
import { useStoreContext } from "../../utils/GlobalState";
import { SET_GOOGLE_ID, SET_NAME } from "../../utils/actions";

function GetUserInfo() {
    const [state, dispatch] = useStoreContext();

    // onMount, make GET request to our /getUserInfo route which returns current passport session data
    // for the current user
    useEffect(() => {
        axios.get('/getUserInfo')
            .then(res => {
                dispatch({ 
                    type: SET_GOOGLE_ID,
                    googleId: res.data.googleId
                 })
                 dispatch({
                    type: SET_NAME,
                    user: res.data.user
                 })
            })
    }), []
    return (
        (state.googleId)
            ? <h6>Happy hiking, { state.user }</h6>
            : <h6></h6>
    )
}

export default GetUserInfo;