import React, { createContext, useReducer, useContext } from "react";
import {
  SET_USER_SEARCH,
  UPDATE_HIKES,
  UPDATE_LAT_LON,
  ADD_BUCKETLIST,
  UPDATE_BUCKETLIST,
  REMOVE_BUCKETLIST,
  ADD_LOG,
  UPDATE_LOG,
  REMOVE_LOG,
  LOADING,
  UPDATE_BAR_CHART,
  UPDATE_LINE_CHART,
  UPDATE_BAR_CHART_LABELS,
  UPDATE_LINE_CHART_LABELS,
  UPDATE_BAR_LABEL_STYLE,
  UPDATE_LINE_LABEL_STYLE,
  SET_GOOGLE_ID,
  SET_NAME,
  SET_CURRENT_HIKE,
  SET_ACTION_NOTIFICATION,
  CATCH_FORECAST,
  SET_FORECAST_LOCATION,
  SET_VISIBLE_INDEX, 
  UPDATE_PAGINATION_HIKES, 
  SET_PREV_INDEX,
  LOAD_MORE_HIKES
} from "./actions";

const StoreContext = createContext();
const { Provider } = StoreContext;

const reducer = (state, action) => {
  switch (action.type) {
    case SET_USER_SEARCH:
      return {
        ...state,
        userSearch: action.userSearch,
        loading: true
      };
    case UPDATE_HIKES:
      return {
        ...state,
        hikes: [...action.hikes],
        loading: false
      };
    case LOAD_MORE_HIKES:
      return {
        ...state,
        hikes: [...state.hikes, ...action.hikes],
        loading: false
      };
    case UPDATE_PAGINATION_HIKES:
      return {
        ...state,
        paginationHikes: [...action.paginationHikes],
      };
    case UPDATE_LAT_LON:
      return {
        ...state,
        lat: action.lat,
        lon: action.lon,
      };
    case ADD_BUCKETLIST:
      return {
        ...state,
        bucketList: [action.bucketList, ...state.bucketList],
        loading: false
      };
    case UPDATE_BUCKETLIST:
      return {
        ...state,
        bucketList: [...action.bucketList],
        loading: false
      };
    case ADD_LOG:
      return {
        ...state,
        log: [action.log, ...state.log],
        loading: false
      };
    case UPDATE_LOG:
      return {
        ...state,
        log: [...action.log],
        loading: false
      };
    case UPDATE_LINE_CHART:
      return {
        ...state,
        lineChart: [...action.lineChart],
        loading: false
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
      case UPDATE_LINE_CHART_LABELS:
      return {
        ...state,
        lineChartLabels: [...action.lineChartLabels],
        loading: false
      };
      case UPDATE_BAR_LABEL_STYLE:
        return {
          ...state,
          barLabelStyle: action.barLabelStyle,
          loading: false
        };
        case UPDATE_LINE_LABEL_STYLE:
          return {
            ...state,
            lineLabelStyle: action.lineLabelStyle,
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
    case LOADING:
      return {
        ...state,
        loading: true
      };
    case SET_GOOGLE_ID:
      return {
        ...state,
        googleId: action.googleId,
        loading: false
      };
    case SET_NAME:
      return {
        ...state,
        user: action.user,
        loading: false
      };
    case SET_CURRENT_HIKE:
      return {
        ...state,
        currentHike: action.currentHike
      };
      case SET_ACTION_NOTIFICATION:
        return {
          ...state,
          actionNotification: action.actionNotification
        }
    case CATCH_FORECAST:
      return {
        ...state,
        weather: action.weather
      };
    case SET_FORECAST_LOCATION: 
      return {
        ...state,
        forecastLocation: action.forecastLocation
      };
    case SET_VISIBLE_INDEX: 
      return {
        ...state,
        visibleIndex: action.visibleIndex
      };
    case SET_PREV_INDEX: 
      return {
        ...state,
        prevIndex: action.prevIndex
      };
    default:
      return state;
  };
};

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    userSearch: "",
    searchLat: "",
    searchLon: "",
    actionNotification: "",
    hikes: [],
    paginationHikes: [],
    visibleIndex: 12,
    prevIndex: 0,
    googleId: "",
    user: "",
    currentHike: {},
    currentAddBucket: {},
    currentAddLog: {},
    bucketList: [],
    log: [],
    barChart: [],
    lineChart: [],
    lineChartLabels: [],
    barChartLabels: [],
    barLabelStyle: {visibility: "hidden"},
    lineLabelStyle: {visibility: "hidden"},
    weather: [],
    forecastLocation: "",
    loading: false
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
