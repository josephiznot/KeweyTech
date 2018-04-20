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
import {
  updateCurrentLocation,
  updateToggledKey
} from "./../../redux/geolocationsReducer";
import Toggle from "material-ui/Toggle";
import CircularProgress from "material-ui/CircularProgress";
import axios from "axios";
import swal from "sweetalert";
class GoogleMaps extends Component {
  constructor() {
    super();
    this.state = {
      geofences: [],
      toggled: false
    };
    this.handleToggle = this.handleToggle.bind(this);
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
  handleToggle(key) {
    var { toggled } = this.state;
    this.props.updateToggledKey(key);
    this.setState({ toggled: !toggled });
  }

  render() {
    console.log("Initially empty:", this.props.geolocationsReducer.toggledKey);
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
              label="TRACKING ENABLED"
              disabled={!e.is_active_2}
              toggled={e.is_active_2 && this.state.toggled ? true : false}
              labelPosition="right"
              onToggle={() => this.handleToggle(e.fence_key)}
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
  getGeofences,
  updateToggledKey
})(GoogleMaps);
