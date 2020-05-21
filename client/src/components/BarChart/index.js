import React, { useEffect } from "react";
import { UPDATE_BAR_CHART } from "../../utils/actions";
import { useStoreContext } from "../../utils/GlobalState";
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalRectSeries,
} from "react-vis";
import "../../../node_modules/react-vis/dist/style.css";

function BarChart() {
  const [state, dispatch] = useStoreContext();

  useEffect(() => {
    processData(state.log);
  }, [state.log]);

  const processData = (data) => {
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
    let stateDataPoints = updatedDistance.map((e, index) => ({
      x: index + 2,
      x0: index + 1,
      y: 0,
      y0: e.length,
    }));
    dispatch({
      type: UPDATE_BAR_CHART,
      barChart: stateDataPoints,
    });
  };

  return (
    <XYPlot width={300} height={300}>
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis title="Hike Index" />
      <YAxis title="Distance (Miles)" />

      {state.barChart.map((hike) => {
        let hikeData = [hike];
        return <VerticalRectSeries key={hike._id} data={hikeData} />;
      })}
    </XYPlot>
  );
}

export default BarChart;
