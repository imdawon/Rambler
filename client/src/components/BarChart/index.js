import React, { useEffect } from "react";
import {
  UPDATE_BAR_CHART,
  UPDATE_BAR_CHART_LABELS,
  UPDATE_BAR_LABEL_STYLE,
  UPDATE_LOG
} from "../../utils/actions";
import { useStoreContext } from "../../utils/GlobalState";
import {
  FlexibleWidthXYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalRectSeries,
  LabelSeries,
} from "react-vis";
import "../../../node_modules/react-vis/dist/style.css";
import API from "../../utils/API";

function BarChart() {
  const [state, dispatch] = useStoreContext();
  useEffect(() => {
    processData();
  }, [state.log]);

  useEffect(() => {
    generateLogData();
  }, [state.barChart,state.barChartLabels,state.barLabelStyle]);
  const generateLogData = () => {
    if(state.googleId){
      API.getUserList(state.googleId)
        .then((hikes) => {
            let logListHikes = hikes.data.log;
            dispatch({
                type: UPDATE_LOG,
                log: logListHikes
            });
        })
        .catch(err => console.log(err));
    }
};

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
      .map((e, index) => ({
        x: index + 2,
        x0: index + 1,
        y: 0,
        y0: e.length,
      }));
    dispatch({
      type: UPDATE_BAR_CHART,
      barChart: stateDataPoints,
    });
    getLabels(updatedDistance);
  };
  const getLabels = (updatedDistance) => {
    let stateDataLabels = updatedDistance
      .slice(updatedDistance.length - 10, updatedDistance.length)
      .map((e, index) => ({
        x: index + 1,
        y: 0,
        label: e.name,
      }));
    dispatch({
      type: UPDATE_BAR_CHART_LABELS,
      barChartLabels: stateDataLabels,
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
      textAlign: "center"
    }}>
    <FlexibleWidthXYPlot xType="linear" style={{textAlign: "center"}} height={300}>
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis tickValues={[1,2,3,4,5,6,7,8,9,10]} title="Hike Index" />
      <YAxis title="Distance (Miles)" />
      {state.barChart.map((hike, index) => {
        let hikeData = [hike];
        return (
          <VerticalRectSeries
            key={index}
            data={hikeData}
            onValueMouseOver={() => {
              dispatch({
                type: UPDATE_BAR_LABEL_STYLE,
                barLabelStyle: { visibility: "visible" },
              });
            }}
            onValueMouseOut={() => {
              dispatch({
                type: UPDATE_BAR_LABEL_STYLE,
                barLabelStyle: { visibility: "hidden" },
              });
            }}
          />
        );
      })}
      {state.barChartLabels.map((hike, index) => {
        let labelData = [{ ...hike, rotation: -45, xOffset: 5 }];
        return (
          <LabelSeries
            key={index}
            allowOffsetToBeResversed
            labelAnchorX="start"
            labelAnchorY="top"
            data={labelData}
            style={state.barLabelStyle}
          />
        );
      })}
    </FlexibleWidthXYPlot>
    </div>
  );
}

export default BarChart;
