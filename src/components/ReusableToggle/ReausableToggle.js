import React, { Component } from "react";
import Toggle from "material-ui/Toggle";
import { connect } from "react-redux";
import { getPoints, getPosition, ridError } from "./../../redux/fencerReducer";
class ReusableToggle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultToggled: false
    };
    this.handleToggle = this.handleToggle.bind(this);
  }
  //Checks to see if user is in any of them.
  //Ough to put it in componentDidMount()
  handleToggle() {
    // if (this.props.fencerReducer.maps) {
    //returns the fence the user is in, if any
    this.props.getPosition(
      this.props.geolocationsReducer.currLat,
      this.props.geolocationsReducer.currLng
    );
  }
  render() {
    // console.log(this.props.fencerReducer.locationId);
    let { E, i, isToggled } = this.props;

    return (
      <div className="map-and-button" key={i}>
        <E
          containerElement={<div className="map-container" />}
          mapElement={<div className="map-element" />}
        />

        <Toggle
          label="TRACKING ENABLED"
          defaultToggled={false}
          // disabled={isToggled}
          labelPosition="right"
          onToggle={() => this.handleToggle()}
        />
      </div>
    );
  }
}
const mapStateToProps = state => state;
export default connect(mapStateToProps, { getPoints, getPosition, ridError })(
  ReusableToggle
);
