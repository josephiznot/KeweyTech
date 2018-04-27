const initialState = {
  outsideTracking: false
};

const OUTSIDE_TRACKING = "OUTSIDE_TRACKING";

export function toggleOutsideTracking(currentTracking) {
  return {
    type: OUTSIDE_TRACKING,
    payload: !currentTracking
  };
}

export default function obReducer(state = initialState, action) {
  switch (action.type) {
    case OUTSIDE_TRACKING:
      return { ...state, outsideTracking: action.payload };
    default:
      return state;
  }
}
