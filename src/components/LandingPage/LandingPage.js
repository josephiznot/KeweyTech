import React, { Component } from "react";

import IntroQ from "./IntroQ/IntroQ";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./LandingPage.css";
import axios from "axios";

class LandingPage extends Component {
  constructor() {
    super();
    this.state = {
      styles: {
        noDecoration: {
          textDecoration: "none"
        }
      }
    };
  }
  componentDidMount() {
    const { REACT_APP_GEOLOCATION_API_KEY: KEY } = process.env;
    axios
      .post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${KEY}`)
      .then(response => {
        const { lat, lng } = response.data.location;
        axios.post("/api/you-have-a-visitor", { lat: lat, lng: lng });
      });
  }
  render() {
    var { styles } = this.state;
    return (
      <div className="landing-container">
        <div className="appbar-imitator" />
        <Link style={styles.noDecoration} to="/about">
          <IntroQ />
        </Link>
      </div>
    );
  }
}
const mapStateToProps = state => state;
export default connect(mapStateToProps)(LandingPage);
