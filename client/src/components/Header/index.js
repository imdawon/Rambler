import React from "react";
import "./style.css";
import headerImage from "../../assets/header.png"

function Header() {
    return (

        <div>
            <img className="header-image" src={headerImage} />
        </div>
    )
}

export default Header;