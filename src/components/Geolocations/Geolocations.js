import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import AppBar from "material-ui/AppBar";
import Avatar from "material-ui/Avatar";
import ListItem from "material-ui/List/ListItem";
import HamburgerMenu from "./../LandingPage/HamburgerMenu/HamburgerMenu";
import NavBarLinks from "./../LandingPage/NavBarLinks";
import {
  getGeolocations,
  getDependent,
  updateCurrentLocation,
  isInBounds
} from "./../../redux/geolocationsReducer";
import { getUser } from "./../../redux/userReducer";
import RaisedButton from "material-ui/RaisedButton";
import { getIterator } from "core-js";
import GoogleMaps from "./../GoogleMaps/GoogleMaps";
import "./Geolocations.css";

class Geolocations extends Component {
  constructor() {
    super();
    this.state = {
      lat: "",
      lng: "",
      accuracy: "",
      trackFlag: false,
      isEnabled: false
    };
    this.enableTracking = this.enableTracking.bind(this);
  }
  //this is going to start a setInterval in order to continually be tracking the user.
  enableTracking() {
    //the flag allows the user to enable/disable the setInterval
    var { trackFlag, isEnabled } = this.state;
    this.setState({
      trackFlag: !trackFlag,
      isEnabled: !isEnabled
    });
    var start = setInterval(() => {
      //updates current location in the reducer
      this.props.updateCurrentLocation();
      /*
      takes the updated state and passes in the coordinates as props.
      You will receive a 400 err when server is restarted because
      the props have not been updated yet. 
      */
      this.props.isInBounds(
        this.props.geolocationsReducer.currLat,
        this.props.geolocationsReducer.currLng
      );
      //once the disable button is hit, the functions will fire once more, and stop.
      if (!this.state.trackFlag) {
        clearInterval(start);
      }
    }, 15000);
  }

  componentDidUpdate() {
    //gets updated state
    if (!this.props.geolocationsReducer.isInBounds) {
      this.props.history.push("/alert");
    }
  }
  componentDidMount() {
    this.props.getUser();
  }
  render() {
    console.log(this.props.geolocationsReducer);
    return (
      <div className="geolocations-container">
        <AppBar
          iconElementLeft={
            <ListItem
              leftAvatar={
                <Avatar src={this.props.userReducer.user.profile_pic} />
              }
            >
              {this.props.userReducer.user.display_name}
            </ListItem>
          }
          iconElementRight={<HamburgerMenu />}
          title={<NavBarLinks />}
          style={{ background: "#3c8dbc" }}
          zDepth={1}
        />
        <div className="geolocations-body-container">
          <RaisedButton
            label={
              this.state.isEnabled ? "Disable Tracking" : "Enable Tracking"
            }
            onClick={() => this.enableTracking()}
          />
          <GoogleMaps />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => state;
export default connect(mapStateToProps, {
  getGeolocations,
  getDependent,
  updateCurrentLocation,
  isInBounds,
  getUser
})(Geolocations);
