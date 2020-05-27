import React, { useRef, useEffect } from "react";
import { useStoreContext } from "../../utils/GlobalState";
import { SET_USER_SEARCH, UPDATE_LAT_LON, UPDATE_HIKES, UPDATE_PAGINATION_HIKES, SET_PREV_INDEX, SET_VISIBLE_INDEX } from "../../utils/actions";
import "./style.css";
import API from "../../utils/API";
import axios from "axios";


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

        // for pagination to render correct indexes
        dispatch({
            type: SET_VISIBLE_INDEX,
            visibleIndex: 24
        });
        dispatch({
            type: SET_PREV_INDEX,
            prevIndex: 12
        });
        search_input.current.value = "";
        max_distance.current.value = "";
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
        let maxDistance = max_distance.current.value
        console.log(maxDistance)
        //we will call for 72 display 12 at a time we will save these in state until ready to render to page
        let maxResults = "72";

        API.getTrails(state.lat, state.lon, maxDistance, maxResults)
            .then((trails) => {
                let hikeResults = trails.data.trails
                dispatch({
                    type: UPDATE_PAGINATION_HIKES,
                    paginationHikes: hikeResults
                })
                getMoreInfo(hikeResults.slice(0, 12));
            })
            .catch(err => console.log(err));
    };
// get more details for trailType and description, once data is recieved update state to the VISIBLE HIKES
    const getMoreInfo = (hikeResults) => {
        let hikesWithDetails;
        axios.post('/hikeDetails', hikeResults)
        .then(res => {
            hikesWithDetails = res.data;
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
};

export default SearchForm;
