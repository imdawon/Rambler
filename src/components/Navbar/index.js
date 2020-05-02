import React from "react";
import { Link } from "react-router-dom";


function Navbar() {
    return (
        <div>
        <Link to="/">
        <button type="submit"> Search </button>
        </Link>
        <Link to="/Wishlist">
        <button type="submit"> Wishlist </button>
        </Link>
        <Link to="/Completed">
        <button type="submit"> Completed </button>
        </Link>
        </div>
    );
}

export default Navbar;