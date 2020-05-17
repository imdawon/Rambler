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
  UPDATE_LINE_CHART
} from "./actions";

const StoreContext = createContext();
const { Provider } = StoreContext;

const reducer = (state, action) => {
  switch (action.type) {
  case SET_USER_SEARCH:
    return {
      ...state,
      userSearch: action.userSearch,
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
        loading: false
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
 

  case REMOVE_BUCKETLIST:
    return {
      ...state,
      bucketList: state.bucketList.filter((hike) => {
        return hike.id !== action.bucketList; 
      })
    };
 
    
      case REMOVE_LOG:
        return {
          ...state,
          log: state.log.filter((hike) => {
            return hike.id !== action.log; 
          })
        };

  case LOADING:
    return {
      ...state,
      loading: true
    };

  default:
    return state;
  }
};

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    userSearch: "",
    searchLat: "",
    searchLon: "",
    hikes: [],
    currentAddBucket: {
        id: "",
        name: "",
        location: "",
        latitude: "",
        longitude: "",
        length: "",
        ascent: "",
        img: "",
        summary: "",
        url: ""
    },
    currentAddLog: {
        id: "",
        name: "",
        location: "",
        latitude: "",
        longitude: "",
        length: "",
        ascent: "",
        img: "",
        summary: "",
        url: ""
    },
    bucketList: [],
    log: [],
    id: "5ec1a6d2b7942608a0cf2d61",
    barChart: [],
    lineChart: [],
    loading: false
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
