import React, { Component } from "react";
import {XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, VerticalRectSeries} from "react-vis";
import "../../../node_modules/react-vis/dist/style.css";

const my_data = [
  {
  "id": 7000130,
  "name": "Bear Peak Out and Back",
  "type": "Hike",
  "summary": "A must-do hike for Boulder locals and visitors alike!",
  "difficulty": "black",
  "stars": 4.6,
  "starVotes": 114,
  "location": "Boulder, Colorado",
  "url": "https://www.hikingproject.com/trail/7000130/bear-peak-out-and-back",
  "imgSqSmall": "https://cdn-files.apstatic.com/hike/7005382_sqsmall_1554312030.jpg",
  "imgSmall": "https://cdn-files.apstatic.com/hike/7005382_small_1554312030.jpg",
  "imgSmallMed": "https://cdn-files.apstatic.com/hike/7005382_smallMed_1554312030.jpg",
  "imgMedium": "https://cdn-files.apstatic.com/hike/7005382_medium_1554312030.jpg",
  "length": 5.7,
  "ascent": 2541,
  "descent": -2540,
  "high": 8342,
  "low": 6103,
  "longitude": -105.2755,
  "latitude": 39.9787,
  "conditionStatus": "All Clear",
  "conditionDetails": "Mostly Dry",
  "conditionDate": "2020-04-29 10:41:00"
  },
  {
    "id": 7011192,
    "name": "Boulder Skyline Traverse",
    "type": "Hike",
    "summary": "The classic long mountain route in Boulder.",
    "difficulty": "black",
    "stars": 4.7,
    "starVotes": 78,
    "location": "Superior, Colorado",
    "url": "https://www.hikingproject.com/trail/7011192/boulder-skyline-traverse",
    "imgSqSmall": "https://cdn-files.apstatic.com/hike/7048859_sqsmall_1555540136.jpg",
    "imgSmall": "https://cdn-files.apstatic.com/hike/7048859_small_1555540136.jpg",
    "imgSmallMed": "https://cdn-files.apstatic.com/hike/7048859_smallMed_1555540136.jpg",
    "imgMedium": "https://cdn-files.apstatic.com/hike/7048859_medium_1555540136.jpg",
    "length": 16.3,
    "ascent": 5409,
    "descent": -5492,
    "high": 8492,
    "low": 5417,
    "longitude": -105.2582,
    "latitude": 39.9388,
    "conditionStatus": "Minor Issues",
    "conditionDetails": "Muddy, Snowy, Icy",
    "conditionDate": "2020-04-16 20:56:03"
    },
  {
  "id": 7004226,
  "name": "Sunshine Lion's Lair Loop",
  "type": "Hike",
  "summary": "Great Mount Sanitas views are the reward for this gentler loop in Sunshine Canyon.",
  "difficulty": "blue",
  "stars": 4.5,
  "starVotes": 108,
  "location": "Boulder, Colorado",
  "url": "https://www.hikingproject.com/trail/7004226/sunshine-lions-lair-loop",
  "imgSqSmall": "https://cdn-files.apstatic.com/hike/7039883_sqsmall_1555092747.jpg",
  "imgSmall": "https://cdn-files.apstatic.com/hike/7039883_small_1555092747.jpg",
  "imgSmallMed": "https://cdn-files.apstatic.com/hike/7039883_smallMed_1555092747.jpg",
  "imgMedium": "https://cdn-files.apstatic.com/hike/7039883_medium_1555092747.jpg",
  "length": 5.3,
  "ascent": 1261,
  "descent": -1282,
  "high": 6800,
  "low": 5530,
  "longitude": -105.2979,
  "latitude": 40.02,
  "conditionStatus": "Minor Issues",
  "conditionDetails": "Muddy, Snowy, Icy",
  "conditionDate": "2020-04-17 18:17:27"
  },
  {
  "id": 7011191,
  "name": "Green Mountain via Ranger/Saddle Rock Loop",
  "type": "Hike",
  "summary": "A loop with a variety of terrain, a lot of climbing, and great views of Boulder.",
  "difficulty": "black",
  "stars": 4.5,
  "starVotes": 82,
  "location": "Boulder, Colorado",
  "url": "https://www.hikingproject.com/trail/7011191/green-mountain-via-rangersaddle-rock-loop",
  "imgSqSmall": "https://cdn-files.apstatic.com/hike/7003740_sqsmall_1554235436.jpg",
  "imgSmall": "https://cdn-files.apstatic.com/hike/7003740_small_1554235436.jpg",
  "imgSmallMed": "https://cdn-files.apstatic.com/hike/7003740_smallMed_1554235436.jpg",
  "imgMedium": "https://cdn-files.apstatic.com/hike/7003740_medium_1554235436.jpg",
  "length": 4.9,
  "ascent": 2305,
  "descent": -2277,
  "high": 8099,
  "low": 5806,
  "longitude": -105.2928,
  "latitude": 39.9975,
  "conditionStatus": "Minor Issues",
  "conditionDetails": "Muddy, Snowy",
  "conditionDate": "2020-05-02 11:40:02"
  },
  {
  "id": 7002439,
  "name": "Walker Ranch",
  "type": "Hike",
  "summary": "An awesome and challenging hike near Boulder with great scenery.",
  "difficulty": "black",
  "stars": 4.5,
  "starVotes": 123,
  "location": "Coal Creek, Colorado",
  "url": "https://www.hikingproject.com/trail/7002439/walker-ranch",
  "imgSqSmall": "https://cdn-files.apstatic.com/hike/7039625_sqsmall_1555092312.jpg",
  "imgSmall": "https://cdn-files.apstatic.com/hike/7039625_small_1555092312.jpg",
  "imgSmallMed": "https://cdn-files.apstatic.com/hike/7039625_smallMed_1555092312.jpg",
  "imgMedium": "https://cdn-files.apstatic.com/hike/7039625_medium_1555092312.jpg",
  "length": 7.6,
  "ascent": 1594,
  "descent": -1585,
  "high": 7335,
  "low": 6439,
  "longitude": -105.3378,
  "latitude": 39.9511,
  "conditionStatus": "All Clear",
  "conditionDetails": "Dry, Mostly Dry - Trail is in good shape and only wet in a few spots.",
  "conditionDate": "2020-04-26 11:37:37"
  }
]

const processData = (data) => {
  return data.map((e, index) => ({
    x: index + 2,
    x0: index + 1,
    y: 0,
    y0: e.length
  }));
};



class BarChart extends Component {
  constructor() {
      super();
      this.state = {
        data: processData(my_data)
      };
    }
render () {
    
return(
  <XYPlot width={300} height={300}>
    <VerticalGridLines />
    <HorizontalGridLines />
    <XAxis title="Hike Index" />
    <YAxis title="Distance (Miles)" />
    
    {this.state.data.map(hike => {
      let hikeData = [hike];
     return <VerticalRectSeries data={hikeData}  /> 
    })}

    
  </XYPlot>
);
}}

  export default BarChart;