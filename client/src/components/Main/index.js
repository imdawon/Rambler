import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "../Navbar";
import Search from "../../pages/Search";
import Completed from "../../pages/Completed";
import Wishlist from "../../pages/Wishlist";
import Auth from "../../pages/Auth";

function Main() {
    return (
        <Router>
        <Navbar />
        <Switch>
        <Route exact path="/">
        <Search />
        </Route>
        <Route exact path="/Wishlist">
        <Wishlist />
        </Route>
        <Route exact path="/Completed"> 
        <Completed />
        </Route>
        <Route exact path="/Auth"> 
        <Auth />
        </Route>
        </Switch>
        </Router>
    )
}

export default Main;