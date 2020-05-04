import axios from "axios";


export default {
    // getTrails: function(lat, lon, distance, apikey) {
    //   return axios.get("https://www.hikingproject.com/data/get-trails?lat=" + lat + "&lon=" + lon + "&maxDistance=" + distance + "&key=" + process.env.REACT_APP_REI_API_KEY)
    // }
    getLocation: function(searchLocation) {
        return axios.get("https://us1.locationiq.com/v1/search.php?key=" + process.env.REACT_APP_LOCATION_API_KEY + "&q=" + searchLocation + "&format=json")
    },

    getTrails: function(lat, lon) {
        return axios.get("https://www.hikingproject.com/data/get-trails?lat=" + lat + "&lon=" + lon + "&maxDistance=10&key=" + process.env.REACT_APP_REI_API_KEY)
    }
}

