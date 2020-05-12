import React from "react";
import { Link } from "react-router-dom";


function Navbar() {
    return (
        <div>
        <Link to="/">
        <button type="submit"> Search </button>
        </Link>
        <Link to="/bucketList">
        <button type="submit"> Bucket List </button>
        </Link>
        <Link to="/log">
        <button type="submit"> Log </button>
        </Link>
        </div>
    );
}

export default Navbar;