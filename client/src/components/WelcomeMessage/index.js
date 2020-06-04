import React from 'react';
import './style.css';
import { useStoreContext } from "../../utils/GlobalState";

function WelcomeMessage() {
    const [state, dispatch] = useStoreContext();

    return (
        <h1 id="welcome-message">Welcome back, {state.user}</h1>
    )
}

export default WelcomeMessage;