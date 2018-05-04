import React, { Component } from "react";

import IntroQ from "./IntroQ/IntroQ";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./LandingPage.css";

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
