import React, { Component } from "react";
import { connect } from "react-redux";
// import axios from "axios";
import RaisedButton from "material-ui/RaisedButton";

class Alert extends Component {
  //----------This is going to make the TWILIO get request-----------------
  // componentDidMount() {
  //   axios.get(`/api/textalert`).then(res => {
  //     console.log(res.data);
  //   });
  // }
  //-----------------------------------------------------------------------------
  handleIgnore() {
    this.props.toggleBounds();

    //^^^^^^^^^^^might need to bootstrap a method in order to modify the state^^^^^^^^^^^^
    this.props.history.push("/geolocations");
    // console.log(this.props.geolocationsReducer.isInBounds);
  }
  render() {
    return (
      <div>
        {/* <h1>alert div</h1>
        <RaisedButton label="IGNORE" onClick={() => this.handleIgnore()} /> */}
      </div>
    );
  }
}
const mapStateToProps = state => state;
export default connect(mapStateToProps)(Alert);
