import React, { Component } from "react";
import { withGoogleMap, GoogleMap, Polygon } from "react-google-maps";
import { connect } from "react-redux";
import "./GoogleMaps.css";
class GoogleMaps extends Component {
  render() {
    console.log(this.props.geolocationsReducer);
    const GoogleMapExample = withGoogleMap(props => (
      <div>
        <GoogleMap
          defaultCenter={{ lat: 32.777611, lng: -96.795467 }}
          defaultZoom={16}
        />
        <Polygon
          path={[
            {
              lat: 32.77806631898924,
              lng: -96.79548728339762
            },
            {
              lat: 32.77818203366717,
              lng: -96.79502948342673
            },
            {
              lat: 32.77732657797422,
              lng: -96.79470584835508
            },
            {
              lat: 32.777050691323495,
              lng: -96.79579305522532
            },
            {
              lat: 32.777918183248,
              lng: -96.79612210916349
            }
          ]}
          editable={true}
        />
      </div>
    ));
    return (
      <div>
        <GoogleMapExample
          containerElement={<div className="map-container" />}
          mapElement={<div className="map-element" />}
        />
        <Polygon />
      </div>
    );
  }
}
const mapStateToProps = state => state;

export default connect(mapStateToProps)(GoogleMaps);
