import React from "react";
import { Link } from "react-router-dom";
import bulma from "bulma";
import "./style.css";

document.addEventListener('DOMContentLoaded', () => {

  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {

        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');

      });
    });
  }

});

function Navbar() {
    return (


  <nav class="navbar is-transparent" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="/">
      <img class="is-rounded" src="https://i.imgur.com/RPFOwRL.png" width="112" height="28" />
    </a>

    <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
      <div class="navbar-item">
        <div class="buttons">
          <Link to="/">
          <a class="navbar-item">
            Search Hikes
          </a>
        </Link>
        <Link to="/bucketList">
          <a class="navbar-item">
            Bucket List
          </a>
        </Link>
        <Link to="/log">
          <a class="navbar-item">
            Hike Log
          </a>
        </Link>
        </div>
      </div> 
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <Link to="/Auth">
            <a class="button is-light">
              Log in
            </a>
          </Link>
        </div>
      </div>
    </div>
  </div>
</nav>
    );
}

export default Navbar;