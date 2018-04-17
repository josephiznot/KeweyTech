import React, { Component } from "react";

import AppBar from "material-ui/AppBar";

import HamburgerMenu from "./HamburgerMenu/HamburgerMenu";
import IntroQ from "./IntroQ/IntroQ";
import { Link } from "react-router-dom";
import NavBarLinks from "./NavBarLinks";
import { connect } from "react-redux";

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
  componentWillMount() {
    if (!this.props.geolocationsReducer.isInBounds) {
      this.props.history.push("/alert");
    }
  }
  render() {
    var { styles } = this.state;
    return (
      <div>
        <AppBar
          showMenuIconButton={false}
          iconElementRight={<HamburgerMenu />}
          title={<NavBarLinks />}
          style={{ background: "#3c8dbc" }}
          zDepth={1}
        />
        <Link style={styles.noDecoration} to="/About">
          <IntroQ />
        </Link>
      </div>
    );
  }
}
const mapStateToProps = state => state;
export default connect(mapStateToProps)(LandingPage);
