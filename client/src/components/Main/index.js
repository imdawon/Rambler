import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "../Navbar";
import Search from "../../pages/Search";
import Log from "../../pages/Log";
import BucketList from "../../pages/BucketList";

function Main() {
    return (
        <Router>
        <Navbar />
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
        </Switch>
        </Router>
    )
}

export default Main;