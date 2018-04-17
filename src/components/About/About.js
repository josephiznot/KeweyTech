import React, { Component } from "react";

class About extends Component {
  componentWillMount() {
    if (this.props.geolocationsReducer.isInBounds) {
      this.props.history.push("/alert");
    }
  }
  render() {
    return <div>About component</div>;
  }
}
export default About;
