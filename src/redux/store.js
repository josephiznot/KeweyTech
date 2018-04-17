import { createStore, combineReducers, applyMiddleware } from "redux";

import promiseMiddleware from "redux-promise-middleware";
import HamburgerReducer from "./HamburgerReducer";
import geolocationsReducer from "./geolocationsReducer";
import userReducer from "./userReducer";

export default createStore(
  combineReducers({ HamburgerReducer, geolocationsReducer, userReducer }),
  applyMiddleware(promiseMiddleware())
);
