import axios from "axios";
var initialState = {
  points: [],
  center: {}
};

const GET_POINTS = "GET_POINTS";

export function getPoints(accessKey) {
  return {
    type: GET_POINTS,
    payload: axios.get(`/geofence/${accessKey}`)
  };
}

export default function fencerReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_POINTS}_FULFILLED`:
      return {
        ...state,
        points: action.payload.data.points,
        center: action.payload.data.center
      };
    default:
      return state;
  }
}
