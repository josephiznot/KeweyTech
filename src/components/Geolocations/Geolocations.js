import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getGeolocations,
  getDependent,
  updateCurrentLocation,
  isInBounds
} from "./../../redux/geolocationsReducer";
import { getUser } from "./../../redux/userReducer";
import RaisedButton from "material-ui/RaisedButton";
import GoogleMaps from "./../GoogleMaps/GoogleMaps";
import "./Geolocations.css";
import swal from "sweetalert";

class Geolocations extends Component {
  constructor() {
    super();
    this.state = {
      trackFlag: false,
      isEnabled: false
    };
    this.enableTracking = this.enableTracking.bind(this);
  }
  //this is going to start a setInterval in order to continually be tracking the user.
  enableTracking() {
    //ENABLE TRACKING ONLY IF THE USER IS WITHIN A GEOFENCE
    if (!this.props.geolocationsReducer.toggledKey) {
      swal({
        title: "Error",
        text: "KEWEY FENCE MUST BE ACTIVATED",
        icon: "info"
      });
    } else {
      //the flag allows the user to enable/disable the setInterval
      var { trackFlag, isEnabled } = this.state;
      isEnabled
        ? swal("Good job!", "Tracking Disabled", "success")
        : swal("Good job!", "Tracking Enabled", "success");
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
          this.props.geolocationsReducer.currLng,
          this.props.geolocationsReducer.toggledKey
        );
        //once the disable button is hit, the functions will fire once more, and stop.
        if (!this.state.trackFlag) {
          clearInterval(start);
        }
      }, 5000);
    }
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
    return (
      <div>
        <div className="geolocations-body-container">
          <RaisedButton
            className="tracking-button"
            label={
              this.state.isEnabled ? "Disable Tracking" : "Enable Tracking"
            }
            onClick={() => this.enableTracking()}
          />
          <GoogleMaps />
        </div>
      </div>
      // </div>
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
