import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import AppBar from "material-ui/AppBar";
import Avatar from "material-ui/Avatar";
import HamburgerMenu from "./../LandingPage/HamburgerMenu/HamburgerMenu";
import NavBarLinks from "./../LandingPage/NavBarLinks";
import {
  getGeolocations,
  getDependent,
  updateCurrentLocation,
  isInBounds
} from "./../../redux/geolocationsReducer";
import RaisedButton from "material-ui/RaisedButton";
import { getIterator } from "core-js";

class Geolocations extends Component {
  constructor() {
    super();
    this.state = {
      lat: "",
      lng: "",
      accuracy: "",
      trackFlag: false
    };
    this.enableTracking = this.enableTracking.bind(this);
  }

  enableTracking() {
    var { trackFlag } = this.state;
    this.setState({
      trackFlag: !trackFlag
    });
    var start = setInterval(() => {
      // console.log("tracking enabled");
      // this.props.updateCurrentLocation();
      this.props.isInBounds();
      // // console.log("tracking enabled");
      if (!this.state.trackFlag) {
        clearInterval(start);
      }
    }, 10000);
  }

  componentDidUpdate() {
    if (!this.props.isInBounds) {
      this.props.history.push("/alert");
    }
    // this.props.updateCurrentLocation();
  }
  componentDidMount() {
    this.setState({ lng: this.props.lng, lat: this.props.lat });
  }
  render() {
    // var { currLat, currLng, isInBounds } = this.props.geolocationsReducer;
    console.log(this.props);
    return (
      <div>
        <AppBar
          iconElementLeft={<Avatar />}
          iconElementRight={<HamburgerMenu />}
          title={<NavBarLinks />}
          style={{ background: "#3c8dbc" }}
          zDepth={1}
        />
        <RaisedButton
          label="Enable Tracking"
          onClick={() => this.enableTracking()}
        />
        <RaisedButton
          label="Disable Tracking"
          onClick={() => this.enableTracking()}
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    ...state.geolocationsReducer
  };
};
export default connect(mapStateToProps, {
  getGeolocations,
  getDependent,
  updateCurrentLocation,
  isInBounds
})(Geolocations);
