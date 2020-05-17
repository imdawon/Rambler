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
  });
  const processData = (data) => {
    let stateData = data.map((e, index) => ({
      x: index + 2,
      x0: index + 1,
      y: 0,
      y0: e.length,
    }));

    dispatch({
      type: UPDATE_BAR_CHART,
      barChart: stateData,
    });
    console.log(stateData, state.barChart);
    return stateData;
  };

  return (
    <XYPlot width={300} height={300}>
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis title="Hike Index" />
      <YAxis title="Distance (Miles)" />

      {state.barChart.map((hike) => {
        let hikeData = [hike];
        return <VerticalRectSeries data={hikeData} />;
      })}
    </XYPlot>
  );
}

export default BarChart;
