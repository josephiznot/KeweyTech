import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import RaisedButton from "material-ui/RaisedButton";

class Alert extends Component {
  componentDidMount() {
    axios.get(`/send`).then(res => {
      console.log(res.data);
    });
  }
  handleIgnore() {
    this.props.geolocationsReducer.isInBounds = true;
    this.props.history.push("/");
    // console.log(this.props.geolocationsReducer.isInBounds);
  }
  render() {
    return (
      <div>
        <h1>alert div</h1>
        <RaisedButton label="IGNORE" onClick={() => this.handleIgnore()} />
      </div>
    );
  }
}
const mapStateToProps = state => state;
export default connect(mapStateToProps)(Alert);
