import React, { useEffect, useState, useContext } from "react";
import SearchForm from "../components/SearchForm";
import SearchResults from "../components/SearchResults";
import HikeContext from "../utils/HikeContext";
import useDebounce from "../utils/debounceHook";
import API from "../utils/API";
import { useParams } from "react-router-dom";

function Search() {
  // holds hikes returned from REI API
  const [hikes, setHikes] = useState([]);

  // user enters search location it then needs to be converted to lat and lon
  const [searchLocation, setSearchLocation] = useState("");
  const debouncedLocation = useDebounce(searchLocation, 500);

  // After location search is converted...
  const [searchLon, setSearchLon] = useState();
  const [searchLat, setSearchLat] = useState();

  // bucket list hike data
  const [bucketList, setBucketList] = useState({
      id: "", 
      name: "", 
      location: "", 
      latitude: "",
      longitude: "",
      length: "", 
      ascent: "", 
      img: "",
      summary: "",
      url: ""
    });

 // completed log hike data
 const [log, setLog] = useState({
  id: "", 
  name: "", 
  location: "", 
  latitude: "",
  longitude: "",
  length: "", 
  ascent: "", 
  img: "",
  summary: "",
  url: ""
});

  // when search page loads &|| the user enters a search
  useEffect(() => {
    if (!searchLocation) {
      return;
    }
    if (debouncedLocation) {
      console.log(debouncedLocation);
      generateCoordinates(debouncedLocation);
    }
  }, [debouncedLocation]);

// When the user adds the hike to their bucketlist
useEffect(() => {
  if (bucketList.name === "") {
    return;
  }
  console.log(bucketList)
  let id = "5eb9b55205ad602434e0d4dc";
 
   API.addToBucketList(id, bucketList)
   .then(res => console.log("Updated bucket list", res.data))
   .catch(err => console.log(err))
})
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
      <SearchResults setBucketList={setBucketList}
      />
    </div>
    </HikeContext.Provider>
  );
}

export default Search;
