import React, {useRef, useEffect} from "react";
import { useStoreContext } from "../../utils/GlobalState";
import { SET_USER_SEARCH, LOADING, UPDATE_LAT_LON, UPDATE_HIKES } from "../../utils/actions";
import "./style.css";
import API from "../../utils/API";

const cheerio = require('cheerio');


const SearchForm = () => {
    //user input
    const search_input = useRef();
    // global state and actions
    const [state, dispatch] = useStoreContext();

    useEffect(() => { 
        if (state.userSearch) {
            generateCoordinates()
            dispatch({
                type: SET_USER_SEARCH,
                userSearch: ""
            });
        };
     }, [state]);

     useEffect(() => { 
        if (state.lat) {
            loadHikes();
            dispatch({
                type: UPDATE_LAT_LON,
                lat: "",
                lon: ""
            });
        };
     }, [state]);

    const handleFormSubmit = e => {
        e.preventDefault();
        console.log(search_input.current.value)
        const searchValue = search_input.current.value;
        console.log(searchValue)
        dispatch({
            type: SET_USER_SEARCH,
            userSearch: searchValue
        });
        console.log(state)
        search_input.current.value = "";
        generateCoordinates();
    };

    // takes user search input to convert to lat lon LocationIQ API 
    const generateCoordinates = () => {
        console.log(state)
      API.getLocation(state.userSearch)
        .then((res) => {
            console.log(res.data[0].lat, res.data[0].lon);
            let lat = parseFloat(res.data[0].lat).toFixed(3);
            let lon = parseFloat(res.data[0].lon).toFixed(3);
            dispatch({
                type: UPDATE_LAT_LON,
                lat: lat,
                lon: lon
            })
            console.log(state)
        })
        .catch((err) => console.log(err));
    };
    // Takes converted lat and lon to make REI API call to gather hike data


   

        const loadHikes = () => {
          API.getTrails(state.lat, state.lon)
          .then((trails) => {
            let hikeResults = trails.data.trails
            console.log(trails.data.trails); 
            // getMoreInfo(hikeResults);
            dispatch ({
                type: UPDATE_HIKES,
                hikes: hikeResults
            });
            console.log(state)
          })
          .catch(err => console.log(err));
        };

    return (
        <div class="search-area">
        <form className="searchForm" onSubmit={handleFormSubmit}>
        <div class="field">
         <p class="control has-icons-left has-icons-right">
           <input class="input is-success" 
           ref={search_input}
        type="text"
        placeholder="Where is the next adventure?"
        id="location"
        /> 
        <span class="icon is-small is-left">
            <i class="fa fa-tree"></i>
        </span> 
        
         </p><button id="searchButton" className="button is-success is-light" type="submit" disabled={state.loading}>
        Search</button>
        
        
        </div>
        </form>
        </div>
    
    )
}

export default SearchForm;
