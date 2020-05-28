import React, { useEffect } from "react";
import {
  UPDATE_LINE_CHART,
  UPDATE_LINE_CHART_LABELS,
  UPDATE_LINE_LABEL_STYLE,
  UPDATE_BAR_CHART,
  UPDATE_LOG
} from "../../utils/actions";
import { useStoreContext } from "../../utils/GlobalState";
import {
  FlexibleWidthXYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  LineSeries,
  LabelSeries,
} from "react-vis";
import "../../../node_modules/react-vis/dist/style.css";
import API from "../../utils/API";

//Set store context and then call processData when the state.log is updated.
function LineChart() {
  const [state, dispatch] = useStoreContext();
  useEffect(() => {
    processData();
  }, [state.log]);

  useEffect(() => {
    if (state.log.length < 1) {
      generateLogData();
    }
  }, []);

  const generateLogData = () => {
    API.getUserList(state.googleId)
        .then((hikes) => {
            let logListHikes = hikes.data.log;
            dispatch({
                type: UPDATE_LOG,
                log: logListHikes
            });
            dispatch({
                type: UPDATE_LINE_CHART,
                lineChart: logListHikes
            });
            dispatch({
                type: UPDATE_BAR_CHART,
                barChart: logListHikes
            });
        })
        .catch(err => console.log(err));
};

//Checks if we need to manipulate the length data.
  const processData = () => {
    let updatedDistance = state.log.map((e) => {
      if (e.trailType === "point to point" && e.length < 12.5) {
        const newHike = { ...e, length: e.length * 2 };
        return newHike;
      } else {
        return e;
      }
    });
    getDataPoints(updatedDistance);
  };

  const getDataPoints = (updatedDistance) => {
    let stateDataPoints = updatedDistance
      .slice(updatedDistance.length - 10, updatedDistance.length)
      .map((e) => ({
        x: e.length,
        y: e.ascent,
      }));
    dispatch({
      type: UPDATE_LINE_CHART,
      lineChart: stateDataPoints,
    });
    getLabels(updatedDistance);
  };

  const getLabels = (updatedDistance) => {
    let stateDataLabels = updatedDistance
      .slice(updatedDistance.length - 10, updatedDistance.length)
      .map((e) => ({
        x: e.length,
        y: e.ascent,
        label: e.name,
      }));
    dispatch({
      type: UPDATE_LINE_CHART_LABELS,
      lineChartLabels: stateDataLabels,
    });
  };
  return (
    <div style={{ 
      height: "45%",
      width: "45%",
      minWidth: "300px",
      minHeight: "300px",
      margin: "0 auto",
      display: "inline-block",
    }}>
    <FlexibleWidthXYPlot style={{textAlign: "center"}} height={300}>
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis title="Distance (Miles)" />
      <YAxis title="Elevation Gain (Feet)" />
      {state.lineChart.map((hike, index) => {
        let hikeData = [{ x: 0, y: 0 }, hike];
        return (
          <LineSeries
            key={index}
            data={hikeData}
            style={{ strokeWidth: 8 }}
            onSeriesMouseOver={() => {
              dispatch({
                type: UPDATE_LINE_LABEL_STYLE,
                lineLabelStyle: { visibility: "visible" },
              });
            }}
            onSeriesMouseOut={() => {
              dispatch({
                type: UPDATE_LINE_LABEL_STYLE,
                lineLabelStyle: { visibility: "hidden" },
              });
            }}
          />
        );
      })}
      {state.lineChartLabels.map((hike, index) => {
        let labelData = [hike];
        return (
          <LabelSeries
            key={index}
            allowOffsetToBeResversed
            data={labelData}
            style={state.lineLabelStyle}
          />
        );
      })}
    </FlexibleWidthXYPlot>
    </div>
  );
}
export default LineChart;
