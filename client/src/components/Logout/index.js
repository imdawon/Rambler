import React, { useEffect } from 'react';
import axios from 'axios';
import { useStoreContext } from "../../utils/GlobalState";
import { SET_GOOGLE_ID, SET_NAME } from "../../utils/actions";
import NavbarNotLoggedIn from "../NavbarNotLoggedIn"
import NavbarLoggedIn from "../NavbarLoggedIn"

function Logout() {
    const [state, dispatch] = useStoreContext();

    // onMount, make GET request to our /getUserInfo route which returns current passport session data
    // for the current user
    useEffect(() => {
        axios.get('/logout')
            .then(function (req,res) {
                req.logout();
                res.redirect('/');
            })
    }, [])
    return (
        <h1>Logging you out</h1>
    )
}

export default Logout;