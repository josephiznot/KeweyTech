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
      geofences: []
    };
  }
  componentDidMount() {
    this.props.updateCurrentLocation().then(res => {
      //^^^^^^^^^^RETURNS CURRENT LOCATION^^^^^^^^^^^^^^^^
      this.props
        .getPosition(
          this.props.geolocationsReducer.currLat,
          this.props.geolocationsReducer.currLng
        )
        //^^^^^^^^^^RETURNS THE FENCE KEY THAT THE USER IS IN^^^^^^^^^^^^^^
        .then(response => {
          axios
            .put(`/api/toggleactive/${response.value.data.data[0].id}`, {
              num: true
            })
            //^^^^^^^^^^^^^^^^ALLOWS USER TO TOGGLE ONLY THE FENCE THEY ARE IN^^^^^^^^^^^^^
            .then(response => {
              this.setState({ geofences: response.data });
            });
        });
    });
  }

  render() {
    const mapped = this.state.geofences
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
        {this.state.geofences[0] ? (
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
