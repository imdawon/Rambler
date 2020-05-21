import React, { useEffect } from "react";
import { useStoreContext } from "../../utils/GlobalState";
import API from "../../utils/API";
import "./style.css";

function Weather() {
    const [state, dispatch] = useStoreContext();

    useEffect(() => {
        generateWeather();
    });

    const generateWeather = () => {
        API.getWeather(state.currentHike.latitude, state.currentHike.longitude)
        .then((res) => {
            compileData(res.data);
        })
        .catch(err => console.log(err));
    };

    const compileData = (data) => {
        console.log(data)
        let city = data.city.name
        console.log(city);
    
    }

    return (
        <p>Weather data</p>
    )
};
 
export default Weather;