import { createStore, combineReducers, applyMiddleware } from "redux";

import promiseMiddleware from "redux-promise-middleware";
import HamburgerReducer from "./HamburgerReducer";
import geolocationsReducer from "./geolocationsReducer";

export default createStore(
  combineReducers({ HamburgerReducer, geolocationsReducer }),
  applyMiddleware(promiseMiddleware())
);
