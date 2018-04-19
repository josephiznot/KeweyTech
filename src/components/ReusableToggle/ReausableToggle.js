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

  handleToggle() {
    this.props.getPosition(
      this.props.geolocationsReducer.currLat,
      this.props.geolocationsReducer.currLng
    );
  }
  componentDidMount() {
    if (this.props.fencerReducer.message) {
      this.setState({ toggle: false });
    }
  }
  render() {
    console.log(this.props.fencerReducer.maps);
    let { E, i } = this.props;

    return (
      <div className="map-and-button" key={i}>
        <E
          containerElement={<div className="map-container" />}
          mapElement={<div className="map-element" />}
        />

        <Toggle
          label="TRACKING ENABLED"
          defaultToggled={false}
          //   disabled={true}
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
