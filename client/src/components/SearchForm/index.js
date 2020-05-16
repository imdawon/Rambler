import React from "react";
import "./style.css";

function SearchForm(props) {
    return (
        <div class="search-area">
        <form className="searchForm" onSubmit={props.handleFormSubmit}>
        <div class="field">
         <p class="control has-icons-left has-icons-right">
           <input class="input is-success" 
        value={props.location}
        onChange={props.handleInputChange}
        name="location"
        list="location"
        type="text"
        placeholder="Where is the next adventure?"
        id="location"
        /> 
        <span class="icon is-small is-left">
            <i class="fa fa-tree"></i>
        </span> 
         </p>
        {/* <label htmlFor="location">Location Search:</label> */}
        
        </div>
        </form>
        </div>

    )
}

export default SearchForm;

{/* <div class="field">
  <p class="control has-icons-left has-icons-right">
    <input class="input" type="email" placeholder="Email" />
    <span class="icon is-small is-left">
      <i class="fas fa-envelope"></i>
    </span>
    <span class="icon is-small is-right">
      <i class="fas fa-check"></i>
    </span>
  </p>
</div> */}