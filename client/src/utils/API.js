import axios from "axios";
export default {
    //location iq for lat/lon
    getLocation: function(searchLocation) {
        return axios.get("https://us1.locationiq.com/v1/search.php?key=" + process.env.REACT_APP_LOCATION_API_KEY + "&q=" + searchLocation + "&format=json")
    },
    // rei api for hike data
    getTrails: function(lat, lon, maxDistance, maxResults) {
        return axios.get("https://www.hikingproject.com/data/get-trails?lat=" + lat + "&lon=" + lon + "&maxDistance=" + maxDistance + "&maxResults=" + maxResults + "&key=" + process.env.REACT_APP_REI_API_KEY)
    },
    // openweather for hike detail weather forecast
    getWeather: function(lat, lon) {
        return axios.get("https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=metric&appid=" + process.env.REACT_APP_OPENWEATHER_API_KEY)
    },
    // get for user bucketlist or log mongodb
    getUserList: function(id) {
        return axios.get("/api/user/" + id);
    },
    // add bucketlist hike item to mognodb
    addToBucketList: function(id, bucketListHike) {
        return axios.put('/api/user/bucketlist/' + id, bucketListHike)
    }, 
    // remove hike from bucketlist mongodb
    removeBucketlistHike: function(id, hikeToRemove) {
        return axios.put("/api/user/bucketlist/remove/" + id, hikeToRemove);
    },
    // add log hike item to mongodb
    addToLog: function(id, logHike) {
        return axios.put('/api/user/log/' + id, logHike)
    },
    // remove log hike item from mongodb
    removeLogHike: function(id, hikeToRemove) {
        return axios.put("/api/user/log/remove/" + id, hikeToRemove);
    }
};