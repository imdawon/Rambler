import React from 'react';
import axios from 'axios';

export default class GetUserInfo extends React.Component {
    state = {
        userSessionData: []
    }

    // onMount, make GET request to our /getUserInfo route which returns current passport session data
    // for the current user
    componentDidMount() {
        axios.get('/getUserInfo')
            .then(res => {
                const userSessionData = res.data;
                this.setState({ userSessionData });
                    console.log(this.state.userSessionData)
            })
    }

    render() {
        return (
            <h6>Happy hiking, { this.state.userSessionData.user }</h6>)
    }
}