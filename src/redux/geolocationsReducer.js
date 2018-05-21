/*
IS_IN_BOUNDS NEED TO CHECK THE FENCE THAT IS TOGGLED TRUE.
*/

import axios from "axios";

var initialState = {
  geolocations: [],
  dependentLocation: [],
  currLat: "",
  currLng: "",
  currLocation: "",
  toggledKey: "",
  isInBounds: true,
  searchToggle: false,
  hasKey: false
};

const GET_GEOLOCATIONS = "GET_GEOLOCATIONS";
const FIND_DEPENDENT = "FIND_DEPENDENT";
const UPDATE_CURRENT_LOCATION = "UPDATE_LOCATION";
const IS_IN_BOUNDS = "IS_IN_BOUNDS";
const UPDATE_TOGGLED_KEY = "UPDATE_TOGGLED_KEY";
const TOGGLE_SEARCH = "TOGGLE_SEARCH";
const ACQUIRE_KEY = "ACQUIRE_KEY";

export function getDependent() {
  return {
    type: FIND_DEPENDENT,
    payload: axios.get("/api/dependent")
  };
}

export function getGeolocations() {
  return {
    type: GET_GEOLOCATIONS,
    payload: axios.get("/api/geolocations")
  };
}
export function updateCurrentLocation() {
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  function success(pos) {
    var crd = pos.coords;

    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
    return crd;
  }

  function error(err) {
    alert(`ERROR(${err.code}): ${err.message}`);
  }

  function aPromise(resolve, reject) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }
  return {
    type: UPDATE_CURRENT_LOCATION,
    payload: aPromise(success, error)
    // axios.post(
    //   `https://www.googleapis.com/geolocation/v1/geolocate?key=${
    //     process.env.REACT_APP_GEOLOCATION_API_KEY
    //   }`
    // )
  };
}
export function isInBounds(lat, lng, key, apiKey) {
  return {
    type: IS_IN_BOUNDS,
    payload: axios.get(`https://api.fencer.io/v1.0/position/inside/${key}`, {
      headers: {
        Authorization: `${apiKey}`,
        "Lat-Pos": lat,
        "Lng-Pos": lng
      }
    })
  };
}

export function updateToggledKey(key) {
  return {
    type: UPDATE_TOGGLED_KEY,
    payload: key
  };
}
export function toggleSearch(toggle) {
  return {
    type: TOGGLE_SEARCH,
    payload: !toggle
  };
}
export function acquireKey(val) {
  return {
    type: ACQUIRE_KEY,
    payload: val
  };
}
///////////////////////////////////////////////////////////////////
/////////////////////////REDUCER//////////////////////////////////
///////////////////////////////////////////////////////////////////

export default function geolocationsReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_GEOLOCATIONS}_FULFILLED`:
      return { ...state, geolocations: action.payload.data };
    case `${FIND_DEPENDENT}_FULFILLED`:
      return { ...state, dependentLocation: action.payload.data };
    case `${UPDATE_CURRENT_LOCATION}_FULFILLED`:
      console.log(action.payload.coords);
      console.log("yello");
      return {
        // ...state,
        // currLocation: action.payload.data.location,
        // currLat: action.payload.data.location.lat,
        // currLng: action.payload.data.location.lng
        currLat: action.payload.coords.latitude,
        currLng: action.payload.coords.longitude
      };
    case `${IS_IN_BOUNDS}_FULFILLED`:
      return { ...state, isInBounds: action.payload.data.data.inside };
    case UPDATE_TOGGLED_KEY:
      return { ...state, toggledKey: action.payload };
    case TOGGLE_SEARCH:
      return {
        ...state,
        searchToggle: action.payload
      };
    case ACQUIRE_KEY:
      return { ...state, hasKey: action.payload };
    default:
      return state;
  }
}
