import React, { useRef, useEffect } from "react";
import { useStoreContext } from "../../utils/GlobalState";
import { SET_USER_SEARCH, LOADING, UPDATE_LAT_LON, UPDATE_HIKES } from "../../utils/actions";
import "./style.css";
import API from "../../utils/API";
import { Collection } from "mongoose";
import axios from "axios";

const cheerio = require('cheerio');

const SearchForm = () => {
    //user search input
    const search_input = useRef();
    // user max distance
    const max_distance = useRef();
    // global state and actions
    const [state, dispatch] = useStoreContext();
    // if user search is in state, generate the coordinates
    useEffect(() => {
        if (state.userSearch) {
            generateCoordinates();
            dispatch({
                type: SET_USER_SEARCH,
                userSearch: ""
            });
        };
    }, [state]);

    // if coodinates are in state, load the hikes from rei api
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
        const searchValue = search_input.current.value;
        dispatch({
            type: SET_USER_SEARCH,
            userSearch: searchValue
        });
        search_input.current.value = "";
        max_distance.current.value = "";
        generateCoordinates();
    };

    // takes user search input to convert to lat lon LocationIQ API 
    const generateCoordinates = () => {
        API.getLocation(state.userSearch)
            .then((res) => {
                let lat = parseFloat(res.data[0].lat).toFixed(3);
                let lon = parseFloat(res.data[0].lon).toFixed(3);
                dispatch({
                    type: UPDATE_LAT_LON,
                    lat: lat,
                    lon: lon
                })
            })
            .catch((err) => console.log(err));
    };
    // Takes converted lat and lon to make REI API call to gather hike data
    const loadHikes = () => {

        let maxDistance =  max_distance.current.value
        console.log(maxDistance)    
        let maxResults = "12";
      
        API.getTrails(state.lat, state.lon, maxDistance, maxResults)
            .then((trails) => {
                let hikeResults = trails.data.trails
                getMoreInfo(hikeResults);
            })
            .catch(err => console.log(err));
    };

    const getMoreInfo = (hikeResults) => {
        let hikesWithDetails;

        axios.post('/hikeDetails', hikeResults)
        .then(res => {
            hikesWithDetails = JSON.parse(res.config.data);
            console.log("!!!",hikesWithDetails);
            dispatch({
                type: UPDATE_HIKES,
                hikes: hikesWithDetails
            });
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
                        />
                        <span className="icon is-small is-left">
                            <i className="fa fa-tree"></i>
                        </span>
                    </p>
                </div>
                <div class="field">
                    <p class="control has-icons-left has-icons-right">
                        <input class="input is-success"
                            ref={max_distance}
                            type="text"
                            placeholder="Travel Distance (default 30 miles)"
                        />
                        <span className="icon is-small is-left">
                            <i className="fa fa-road"></i>
                        </span>
                    </p>
                    <button id="searchButton" className="button is-success is-light" type="submit" disabled={state.loading}>
                        Search</button>
                </div>
            </form>
        </div>
    )
}

export default SearchForm;
