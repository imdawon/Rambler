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
 

//   case REMOVE_BUCKETLIST:
//     return {
//       ...state,
//       favorites: state.bucketlist.filter((hike) => {
//         return hike._id !== action._id; 
//       })
//     };
 
    
    //   case REMOVE_LOG:
    //     return {
    //       ...state,
    //       favorites: state.log.filter((hike) => {
    //         return hike._id !== action._id; 
    //       })
    //     };

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
    id: "5ec055166746f2044c1031e1",
    loading: false
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
