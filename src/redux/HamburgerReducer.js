const initialState = {
  open: false,
  login: "LOGIN/SIGNUP",
  signOut: "SIGN OUT",
  settings: "SETTINGS",
  keweyFence: "KEWEY FENCE",
  about: "ABOUT",
  history: "HISTORY",
  geolocations: "GEOLOCATIONS"
};

const HAMBURGER_OPEN = "HAMBURGER_CLICK";
const HAMBURGER_CLOSE = "HAMBURGER_CLOSE";

export const handleClick = event => {
  // This prevents ghost click.
  event.preventDefault();
  return {
    type: HAMBURGER_OPEN,
    payload: event
  };
};

export const handleRequestClose = () => {
  return {
    type: HAMBURGER_CLOSE,
    payload: false
  };
};

export default function HamburgerReducer(state = initialState, action) {
  var { open } = state;
  switch (action.type) {
    case HAMBURGER_OPEN:
      return { ...state, anchorEl: action.payload.currentTarget, open: !open };
    case HAMBURGER_CLOSE:
      return { ...state, open: action.payload };
    default:
      return state;
  }
}
