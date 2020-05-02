import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "../Navbar";
import Search from "../../pages/Search";
import Completed from "../../pages/Completed";
import Wishlist from "../../pages/Wishlist";

function Main() {
    return (
        <Router>
        <Navbar />
        <Route exact path="/" component={Search} />
        <Route exact path="/Wishlist" component={Wishlist} />
        <Route exact path="/Completed" component={Completed} />
        </Router>
    )
}

export default Main;