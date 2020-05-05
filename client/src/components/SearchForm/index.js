import React from "react";
import "./style.css";

function SearchForm(props) {
    return (
        <form className="searchForm" onSubmit={props.handleFormSubmit}>
        <div>
        <label htmlFor="location">Location Search:</label>
        <input 
        value={props.location}
        onChange={props.handleInputChange}
        name="location"
        list="location"
        type="text"
        placeholder="Where is the next adventure?"
        id="location"
        />
        </div>
        </form>

    )
}

export default SearchForm;