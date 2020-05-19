import React, { useEffect } from 'react';
import { useStoreContext } from "../../utils/GlobalState";
import { SET_GOOGLE_ID } from "../../utils/actions";
import axios from 'axios';

function GetUserInfo(){
   
    const [state, dispatch] = useStoreContext();


    // onMount, make GET request to our /getUserInfo route which returns current passport session data
    // for the current user
    useEffect(() => {
        axios.get('/getUserInfo')
            .then(res => {
                console.log("res.data", res.data)
                const userSessionData = res.data;
                dispatch({
                    type: SET_GOOGLE_ID,
                    googleId: userSessionData
                });
                console.log("state googleId", state.googleId)
            })
    }, []);

    
        return (
            <h6>GetUserInfo Component Successfully Loaded. Check console for logged user session data!</h6>)
    
};

export default GetUserInfo;