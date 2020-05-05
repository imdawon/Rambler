import React, { useEffect, useState } from "react";
import SearchForm from "../components/SearchForm";
import SearchResults from "../components/SearchResults";
import HikeContext from "../utils/HikeContext";
import useDebounce from "../utils/debounceHook";
import API from "../utils/API";

function Search() {
  const [hikes, setHikes] = useState([]);
  const [searchLocation, setSearchLocation] = useState("");
  //After location search is converted...
  const [searchLon, setSearchLon] = useState();
  const [searchLat, setSearchLat] = useState();
  const debouncedLocation = useDebounce(searchLocation, 500);

  useEffect(() => {
    if (!searchLocation) {
      return;
    }
    if (debouncedLocation) {
      console.log(debouncedLocation);
      generateCoordinates(debouncedLocation);
    }
  }, [debouncedLocation]);

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

  const loadHikes = (lat, lon) => {
    API.getTrails(lat, lon).then((trails) => {
    let hikeResults = trails.data.trails
      console.log(trails.data.trails);
      setHikes(hikeResults);
    });
  };

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
      <SearchResults />
    </div>
    </HikeContext.Provider>
  );
}

export default Search;
