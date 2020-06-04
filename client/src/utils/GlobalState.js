import React, { createContext, useReducer, useContext } from "react";
import {
  ADD_BUCKETLIST,
  ADD_LOG,
  CATCH_FORECAST,
  LOADING,
  LOAD_MORE_HIKES,
  REMOVE_BUCKETLIST,
  REMOVE_LOG,
  SET_ACTION_NOTIFICATION,
  SET_CURRENT_HIKE,
  SET_GOOGLE_ID,
  SET_FORECAST_LOCATION,
  SET_NAME,
  SET_PREV_INDEX,
  SET_USER_SEARCH,
  SET_VISIBLE_INDEX,
  UPDATE_BAR_CHART,
  UPDATE_BAR_CHART_LABELS,
  UPDATE_BAR_LABEL_STYLE,
  UPDATE_BUCKETLIST,
  UPDATE_HIKES,
  UPDATE_LAT_LON,
  UPDATE_LINE_CHART,
  UPDATE_LINE_CHART_LABELS,
  UPDATE_LINE_LABEL_STYLE,
  UPDATE_LOG,
  UPDATE_PAGINATION_HIKES

} from "./actions";

const StoreContext = createContext();
const { Provider } = StoreContext;

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_BUCKETLIST:
      return {
        ...state,
        bucketList: [action.bucketList, ...state.bucketList],
        loading: false
      };
    case ADD_LOG:
      return {
        ...state,
        log: [action.log, ...state.log],
        loading: false
      };
    case CATCH_FORECAST:
      return {
        ...state,
        weather: action.weather
      };
    case LOADING:
      return {
        ...state,
        loading: true
      };
    case LOAD_MORE_HIKES:
      return {
        ...state,
        hikes: [...state.hikes, ...action.hikes],
        loading: false
      };
    case REMOVE_BUCKETLIST:
      return {
        ...state,
        bucketList: state.bucketList.filter((hike) => {
          return hike.id !== action.bucketList;
        }),
        loading: false
      };
    case REMOVE_LOG:
      return {
        ...state,
        log: state.log.filter((hike) => {
          return hike.id !== action.log;
        }),
        loading: false
      };
    case SET_ACTION_NOTIFICATION:
      return {
        ...state,
        actionNotification: action.actionNotification
      };
    case SET_CURRENT_HIKE:
      return {
        ...state,
        currentHike: action.currentHike
      };
    case SET_GOOGLE_ID:
      return {
        ...state,
        googleId: action.googleId,
        loading: false
      };
    case SET_FORECAST_LOCATION:
      return {
        ...state,
        forecastLocation: action.forecastLocation
      };
    case SET_NAME:
      return {
        ...state,
        user: action.user,
        loading: false
      };
    case SET_USER_SEARCH:
      return {
        ...state,
        userSearch: action.userSearch,
        loading: true
      };
    case SET_VISIBLE_INDEX:
      return {
        ...state,
        visibleIndex: action.visibleIndex
      };
    case UPDATE_BAR_CHART:
      return {
        ...state,
        barChart: [...action.barChart],
        loading: false
      };
    case UPDATE_BAR_CHART_LABELS:
      return {
        ...state,
        barChartLabels: [...action.barChartLabels],
        loading: false
      };
    case UPDATE_BAR_LABEL_STYLE:
      return {
        ...state,
        barLabelStyle: action.barLabelStyle,
        loading: false
      };
    case UPDATE_BUCKETLIST:
      return {
        ...state,
        bucketList: [...action.bucketList],
        loading: false
      };
    case UPDATE_HIKES:
      return {
        ...state,
        hikes: [...action.hikes],
        loading: false
      };
    case UPDATE_LAT_LON:
      return {
        ...state,
        lat: action.lat,
        lon: action.lon,
      };
    case UPDATE_LINE_CHART:
      return {
        ...state,
        lineChart: [...action.lineChart],
        loading: false
      };
    case UPDATE_LINE_CHART_LABELS:
      return {
        ...state,
        lineChartLabels: [...action.lineChartLabels],
        loading: false
      };
    case UPDATE_LINE_LABEL_STYLE:
      return {
        ...state,
        lineLabelStyle: action.lineLabelStyle,
        loading: false
      };
    case UPDATE_LOG:
      return {
        ...state,
        log: [...action.log],
        loading: false
      };
    case SET_PREV_INDEX:
      return {
        ...state,
        prevIndex: action.prevIndex
      };
    case UPDATE_PAGINATION_HIKES:
      return {
        ...state,
        paginationHikes: [...action.paginationHikes],
      };
    default:
      return state;
  };
};

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    actionNotification: "",
    barChart: [],
    barChartLabels: [],
    barLabelStyle: { visibility: "hidden" },
    bucketList: [],
    currentAddBucket: {},
    currentAddLog: {},
    currentHike: {},
    googleId: "",
    forecastLocation: "",
    hikes: [],
    loading: false,
    lineChart: [],
    lineChartLabels: [],
    lineLabelStyle: { visibility: "hidden" },
    log: [],
    paginationHikes: [],
    prevIndex: 0,
    searchLat: "",
    searchLon: "",
    user: "",
    userSearch: "",
    visibleIndex: 12,
    weather: [],
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
