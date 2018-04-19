import React, { Component } from "react";
import { withGoogleMap, GoogleMap, Polygon } from "react-google-maps";
import { connect } from "react-redux";
import "./GoogleMaps.css";
import { getPoints, getPosition, ridError } from "./../../redux/fencerReducer";
import { updateCurrentLocation } from "./../../redux/geolocationsReducer";
import Toggle from "material-ui/Toggle";
import CircularProgress from "material-ui/CircularProgress";
import ReusableToggle from "../ReusableToggle/ReausableToggle";
class GoogleMaps extends Component {
  constructor() {
    super();
    // this.state = {
    //   toggle: false
    // };
    // this.handleToggle = this.handleToggle.bind(this);
  }
  componentDidMount() {
    this.props.getPoints(process.env.REACT_APP_DEV_KEY);
    this.props.getPoints(process.env.REACT_APP_BELL_KEY);
    this.props.getPoints(process.env.REACT_APP_FRANKLIN_KEY);
    this.props.updateCurrentLocation();
  }
  componentDidUpdate() {
    if (this.props.fencerReducer.message) {
      alert(this.props.fencerReducer.message);
      this.props.ridError();
    }
  }
  //   handleToggle(val) {
  //     let { toggle } = this.state;
  //     this.setState({ toggle: !toggle });
  //     this.props.getPosition(
  //       this.props.geolocationsReducer.currLat,
  //       this.props.geolocationsReducer.currLng
  //     );
  //   }
  render() {
    console.log(this.props.fencerReducer);
    const mapped = this.props.fencerReducer.maps
      .map((e, i, a) => {
        return withGoogleMap(() => (
          <div>
            <div>
              <GoogleMap defaultCenter={e.center} defaultZoom={16} />
              <Polygon path={e.points} />
            </div>
            <h1 className="google-map-header">{e.alias}</h1>
          </div>
        ));
      })
      .map((E, i) => {
        return <ReusableToggle E={E} key={i} />;
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
  ridError
})(GoogleMaps);
