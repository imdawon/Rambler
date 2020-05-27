import React, { useEffect } from "react";
import { useStoreContext } from "../../utils/GlobalState";
import API from "../../utils/API";
import { CATCH_FORECAST, SET_FORECAST_LOCATION } from '../../utils/actions';
import Moment from 'react-moment';
import "./style.css";

function Weather() {
    const [state, dispatch] = useStoreContext();

    useEffect(() => {
        window.scrollTo(0, 0);
        generateWeather();
    }, []);

    const generateWeather = () => {
        API.getWeather(state.currentHike.latitude, state.currentHike.longitude)
            .then((res) => {
                compileData(res.data);
            })
            .catch(err => console.log(err));
    };

    const compileData = (data) => {
        const dailyData = data.list.filter(reading => {
            return reading.dt_txt.includes("12:00:00")
        }
        )
        let city = data.city.name
        dispatch({
            type: CATCH_FORECAST,
            weather: dailyData
        });
        dispatch({
            type: SET_FORECAST_LOCATION,
            forecastLocation: city
        });
    }

    return (
        <div className='weather'>
            <div className="main_weather">
                <div className='weather_title'>
                    <h1 className='weather_title'>Local Weather Conditions</h1>
                    <h1 className='weather_city'>{state.forecastLocation}</h1>
                </div>
            </div>
            <div className='cards'>
                {state.weather.map((day, i) => (
                    <div id="display" className="cards_item" key={i}>
                        <div className="card">
                            <div className="card_content is-centered no_white">
                                <img className="weather_icon" src={`https://openweathermap.org/img/w/${day.weather[0].icon}.png`} alt="wthr img" />

                                <p className="card_text">Date:
                <Moment format="MM/DD h:mm">{day.dt_txt}</Moment>
                                </p>

                                <p className="card_text red_color">Temp: {(Math.floor((day.main.temp * 9 / 5) + 32))} °F</p>
                                <p className="card_text">Humidity: {day.main.humidity} %</p>
                                <p className="card_text">Wind: {day.wind.speed} MPH</p>
                                <p className="card_text">Expect {day.weather[0].description}</p>
                            </div></div></div>
                ))}
            </div>
        </div>

    )
};

export default Weather;