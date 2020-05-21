import React, { useEffect } from "react";
import { UPDATE_LINE_CHART } from "../../utils/actions";
import { useStoreContext } from "../../utils/GlobalState";
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  LineSeries,
} from "react-vis";
import "../../../node_modules/react-vis/dist/style.css";
function LineChart() {
  const [state, dispatch] = useStoreContext();
  useEffect(() => {
    processData();
  }, [state.log]);

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
    let stateDataPoints = updatedDistance.map((e) => ({
      x: e.length,
      y: e.ascent,
    }));
    dispatch({
      type: UPDATE_LINE_CHART,
      lineChart: stateDataPoints,
    });
  };
  return (
    <XYPlot width={300} height={300}>
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis title="Distance (Miles)" />
      <YAxis title="Elevation Gain (Feet)" />
      {state.lineChart.map((hike) => {
        let hikeData = [{ x: 0, y: 0 }, hike];
        return <LineSeries key={hike.id} data={hikeData} />;
      })}
    </XYPlot>
  );
}
export default LineChart;
