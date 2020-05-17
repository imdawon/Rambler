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
    processData(state.log);
  }, [state.log]);
  const processData = (data) => {
    let stateData = data.map((e) => ({
      x: e.length,
      y: e.ascent,
    }));
    dispatch({
      type: UPDATE_LINE_CHART,
      lineChart: stateData,
    });
    return stateData;
  };

  return (
    <XYPlot width={300} height={300}>
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis title="Distance (Miles)" />
      <YAxis title="Elevation Gain (Feet)" />
      {state.lineChart.map((hike) => {
        let hikeData = [{ x: 0, y: 0 }, hike];
        return <LineSeries key={hike._id} data={hikeData} />;
      })}
    </XYPlot>
  );
}

export default LineChart;
