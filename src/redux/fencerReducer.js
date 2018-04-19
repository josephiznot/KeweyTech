import axios from "axios";
var initialState = {
  maps: [],
  currentLocationId: ""
};

const GET_POINTS = "GET_POINTS";
const GET_POSITION = "GET_POSITION";
const RID_ERROR = "RID_ERROR";

export function getPoints(key) {
  return {
    type: GET_POINTS,
    payload: axios.get(`https://api.fencer.io/v1.0/geofence/${key}`, {
      headers: { Authorization: `${process.env.REACT_APP_FENCER_API_KEY}` }
    })
  };
}
export function getPosition(lat, lng) {
  return {
    type: GET_POSITION,
    payload: axios.get("https://api.fencer.io/v1.0/position", {
      headers: {
        Authorization: `${process.env.REACT_APP_FENCER_API_KEY}`,
        "Lat-Pos": lat,
        "Lng-Pos": lng
      }
    })
  };
}
export function ridError() {
  return {
    type: RID_ERROR,
    payload: ""
  };
}
export default function fencerReducer(state = initialState, action) {
  var { maps } = state;
  switch (action.type) {
    case `${GET_POINTS}_FULFILLED`:
      return {
        ...state,
        maps: maps.concat({
          points: action.payload.data.data.points,
          center: {
            lat: action.payload.data.data.center.lat,
            lng: action.payload.data.data.center.lng
          },
          alias: action.payload.data.data.alias,
          isToggled: false
        })
      };
    case `${GET_POSITION}_FULFILLED`:
      return action.payload.data.error
        ? { ...state, message: "USER NOT IN BOUNDS" }
        : {
            ...state,
            currentLocationId: action.payload.data.data[0].id
          };

    // /----------------------------i tried this, but got bugged. will check it out in AM--------------
    // case `${GET_POSITION}_FULFILLED`:
    //   return action.payload.data.error
    //     ? { ...state, message: "USER NOT IN BOUNDS" }
    //     : (state = state.maps.map((e, i) => {
    //         return e.alias === action.payload.data.data.alias
    //           ? {
    //               ...state.maps,
    //               locationId: action.payload.data.data[0].id
    //             }
    //           : null;
    //       }));
    //  -------------------------------------------------------------------------------------- */

    case RID_ERROR:
      return {
        ...state,
        message: action.payload
      };
    default:
      return state;
  }
}
