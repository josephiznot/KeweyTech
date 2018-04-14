import { createStore, combineReducers } from "redux";
import HamburgerReducer from "./HamburgerReducer";
export default createStore(combineReducers({ HamburgerReducer }));
