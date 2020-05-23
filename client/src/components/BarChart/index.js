import React, { useEffect } from "react";
import { UPDATE_BAR_CHART, UPDATE_BAR_CHART_LABELS } from "../../utils/actions";
import { useStoreContext } from "../../utils/GlobalState";
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalRectSeries,
  LabelSeries
} from "react-vis";
import "../../../node_modules/react-vis/dist/style.css";

function BarChart() {
  const [state, dispatch] = useStoreContext();

  useEffect(() => {
    processData(state.log);
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
    getLabels(updatedDistance)
  };
  const getLabels = (updatedDistance) => {
    let stateDataLabels = updatedDistance.map((e, index) => ({
      x: index +2,
      y: 0,
      label: e.name
    }));
    console.log("STATE DATA LABELS", stateDataLabels);
    dispatch({
      type: UPDATE_BAR_CHART_LABELS,
      barChartLabels: stateDataLabels
    })
      }

  return (
    <XYPlot width={500} height={500}>
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis title="Hike Index" />
      <YAxis title="Distance (Miles)" />
      {state.barChart.map((hike) => {
        let hikeData = [hike];
        return <VerticalRectSeries key={hike._id} data={hikeData} />;
      })}
      {state.barChartLabels.map((hike) => {
        let labelData = [{...hike, rotation: -45, xOffset: -100}]
        return <LabelSeries allowOffsetToBeResversed labelAnchorX="start" labelAnchorY="top" data={labelData} />
      })}
    </XYPlot>
  );
}

export default BarChart;
