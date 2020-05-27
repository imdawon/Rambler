import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "../Navbar";
import Search from "../../pages/Search";
import Auth from "../../pages/Auth";
import Log from "../../pages/Log";
import BucketList from "../../pages/BucketList";
import Detail from "../../pages/Detail";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ActionNotification from '../../components/ActionNotification';
import GetUserInfo from "../GetUserInfo";
import Logout from "../Logout";

function Main() {

    return (
        <Router>
            <GetUserInfo />
            <Header />
             <ActionNotification />
            <Switch>
                <Route exact path="/">
                    <Search />
                </Route>
                <Route exact path="/BucketList">
                    <BucketList />
                </Route>
                <Route exact path="/Log">
                    <Log />
                </Route>
                <Route exact path="/Auth">
                    <Auth />
                </Route>
                <Route exact path="/hike_details/:id">
                    <Detail />
                </Route>
                <Route exact path="/Logout">
                    <Logout />
                </Route>
            </Switch>
            <Footer />
        </Router>
    )
}

export default Main;