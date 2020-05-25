import React, { useEffect } from "react";
import {
  UPDATE_LINE_CHART,
  UPDATE_LINE_CHART_LABELS,
  UPDATE_LINE_LABEL_STYLE,
} from "../../utils/actions";
import { useStoreContext } from "../../utils/GlobalState";
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  LineSeries,
  LabelSeries,
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
    <XYPlot width={500} height={500}>
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
    </XYPlot>
  );
}
export default LineChart;
