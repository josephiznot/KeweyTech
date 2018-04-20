import React, { Component } from "react";
import { withGoogleMap, GoogleMap, Polygon } from "react-google-maps";
import { connect } from "react-redux";
import "./GoogleMaps.css";
import {
  getPoints,
  getPosition,
  ridError,
  getGeofences
} from "./../../redux/fencerReducer";
import { updateCurrentLocation } from "./../../redux/geolocationsReducer";
import Toggle from "material-ui/Toggle";
import CircularProgress from "material-ui/CircularProgress";
import ReusableToggle from "../ReusableToggle/ReausableToggle";
import swal from "sweetalert";
import axios from "axios";
class GoogleMaps extends Component {
  constructor() {
    super();
    this.state = {
      center: []
    };
  }
  componentDidMount() {
    this.props.getGeofences();
    // this.props.updateCurrentLocation();
    //---------
  }
  // componentDidUpdate() {
  //   if (this.props.fencerReducer.message) {
  //     swal(this.props.fencerReducer.message);
  //     this.props.ridError();
  //   }
  // }
  render() {
    console.log(this.props.fencerReducer.maps);
    const mapped = this.props.fencerReducer.maps
      .map((e, i, a) => {
        return withGoogleMap(() => (
          <div>
            <div>
              <GoogleMap defaultCenter={e.fence_center} defaultZoom={15} />
              <Polygon path={e.fence_points} />
            </div>
            <h1 className="google-map-header">{e.alias}</h1>
            <Toggle
              id="1"
              label="TRACKING ENABLED"
              disabled={!e.is_active_2}
              labelPosition="right"
              // onToggle={() => this.handleToggle()}
            />
          </div>
        ));
      })
      .map((E, i) => {
        return (
          <div className="map-and-button" key={i}>
            <E
              containerElement={<div className="map-container" />}
              mapElement={<div className="map-element" />}
            />
          </div>
        );
      });
    return (
      <div>
        {this.props.fencerReducer.maps[0] ? (
          mapped
        ) : (
          <div className="geolocations-loading">
            <CircularProgress />
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => state;

export default connect(mapStateToProps, {
  getPoints,
  getPosition,
  updateCurrentLocation,
  ridError,
  getGeofences
})(GoogleMaps);
