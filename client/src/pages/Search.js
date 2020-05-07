import React, { useEffect, useState } from "react";
import SearchForm from "../components/SearchForm";
import SearchResults from "../components/SearchResults";
import HikeContext from "../utils/HikeContext";
import useDebounce from "../utils/debounceHook";
import API from "../utils/API";

function Search() {
  // holds hikes returned from REI API
  const [hikes, setHikes] = useState([]);

  // user enters search location it then needs to be converted to lat and lon
  const [searchLocation, setSearchLocation] = useState("");
  const debouncedLocation = useDebounce(searchLocation, 500);

  // After location search is converted...
  const [searchLon, setSearchLon] = useState();
  const [searchLat, setSearchLat] = useState();

  useEffect(() => {
    if (!searchLocation) {
      return;
    }
    if (debouncedLocation) {
      console.log(debouncedLocation);
      generateCoordinates(debouncedLocation);
    }
  }, [debouncedLocation]);

  // takes user search input to convert to lat lon LocationIQ API 
  const generateCoordinates = () => {
    API.getLocation(searchLocation)
      .then((res) => {
        console.log(res.data[0].lat, res.data[0].lon);
        let lat = parseFloat(res.data[0].lat).toFixed(3);
        let lon = parseFloat(res.data[0].lon).toFixed(3);
        setSearchLat(lat);
        setSearchLon(lon);
        console.log(searchLat, searchLon);
        loadHikes(lat, lon);
      })
      .catch((err) => console.log(err));
  };

  // Takes converted lat and lon to make REI API call to gather hike data
  const loadHikes = (lat, lon) => {
    API.getTrails(lat, lon).then((trails) => {
    let hikeResults = trails.data.trails
      console.log(trails.data.trails);
      setHikes(hikeResults);
    });
  };

  // When the user adds the hike to their bucketlist
  const addHikeToBucketList = (hikeData) => {
    console.log(hikeData)
  }

  // sets the users search to state
  const handleInputChange = (event) => {
    setSearchLocation(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <HikeContext.Provider value={hikes}>
    <div>
      <SearchForm
        handleFormSubmit={handleFormSubmit}
        handleInputChange={handleInputChange}
        results={searchLocation}
      />
      <SearchResults addHikeToBucketList={addHikeToBucketList}
      />
    </div>
    </HikeContext.Provider>
  );
}

export default Search;
