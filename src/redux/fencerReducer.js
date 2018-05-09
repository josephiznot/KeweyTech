import axios from "axios";
var initialState = {
  maps: [],
  currentLocationId: ""
};

const GET_GEOFENCES = "GET_GEOFENCES";
const GET_POINTS = "GET_POINTS";
const GET_POSITION = "GET_POSITION";
const UPDATE_GEOFENCE = "UPDATE_GEOFENCE";

export function getGeofences() {
  console.log("hit");
  return {
    type: GET_GEOFENCES,
    payload: axios.get("/api/geofences")
  };
}
//-------dont think i actually use this function...hahaha
export function getPoints(key) {
  return {
    type: GET_POINTS,
    payload: axios.get(`https://api.fencer.io/v1.0/geofence/${key}`, {
      headers: {
        Authorization: `${
          process.env.REACT_APP_FENCER_API_KEY
          // process.env.REACT_APP_TESTER
        }`
      }
    })
  };
}
export function getPosition(lat, lng, user_id, apiKey, is_admin) {
  return {
    type: GET_POSITION,
    payload: axios.get("https://api.fencer.io/v1.0/position", {
      headers: {
        Authorization: `${
          apiKey
          // process.env.REACT_APP_FENCER_API_KEY
          // process.env.REACT_APP_TESTER
        }`,
        "Lat-Pos": lat,
        "Lng-Pos": lng
      }
    })
  };
}

export function updateGeofence(key) {
  return {
    type: UPDATE_GEOFENCE,
    payload: key
  };
}

//////////////////////////////////////////////////////////////
//------------------REDUCER------------------
//////////////////////////////////////////////////////////////
export default function fencerReducer(state = initialState, action) {
  var { maps } = state;
  switch (action.type) {
    case `${GET_GEOFENCES}_FULFILLED`:
      return {
        ...state,
        maps: maps.concat(action.payload.data)
      };
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
    default:
      return state;
  }
}
