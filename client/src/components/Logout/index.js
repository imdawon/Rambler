import React, { useEffect } from 'react';
import axios from 'axios';
import { useStoreContext } from "../../utils/GlobalState";
import { SET_GOOGLE_ID, SET_NAME } from "../../utils/actions";
import NavbarNotLoggedIn from "../NavbarNotLoggedIn"
import NavbarLoggedIn from "../NavbarLoggedIn"

function Logout() {
    const [state, dispatch] = useStoreContext();

    useEffect(() => {
        axios.get('/logout')
            .then(res => {
                res.send('Logging you out...')
            })
    }, [])
}

export default Logout;