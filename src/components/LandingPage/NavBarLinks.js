import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./LandingPage.css";
import History from "material-ui/svg-icons/action/history";
import Setting from "material-ui/svg-icons/action/settings";
import Location from "material-ui/svg-icons/communication/location-on";
import SignIn from "material-ui/svg-icons/action/fingerprint";
import Logout from "material-ui/svg-icons/action/power-settings-new";
import { getUser } from "./../../redux/userReducer";
import Bug from "material-ui/svg-icons/action/bug-report";

class NavBarLinks extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false
    };
  }
  componentDidMount() {
    this.props
      .getUser()
      .then(response => {
        this.setState({ isLoggedIn: true });
      })
      .catch(err => {
        err && this.setState({ isLoggedIn: false });
      });
  }
  render() {
    return (
      <div id="navbar-links-wrapper">
        <div>
          {!this.state.isLoggedIn ? (
            <a href={process.env.REACT_APP_LOGIN}>
              <SignIn />
              <h2>LOGIN/SIGNUP</h2>
            </a>
          ) : (
            <a href={`${process.env.REACT_APP_LOGOUT}`}>
              <Logout />
              <h2>SIGNOUT</h2>
            </a>
          )}
        </div>|
        <Link to="/geolocations">
          <Location />
          <h2> KEWEY FENCES</h2>
        </Link>|
        <Link to="/history">
          <History />
          <h2> HISTORY</h2>
        </Link>|
        <Link to="/settings">
          <Setting />
          <h2> ADMIN SETTINGS</h2>
        </Link>|
        <a
          className="report-bug"
          href={`mailto:${
            process.env.REACT_APP_REPORT_BUG
          }?subject=Bug%20report&body=Please%20report%20the%20issue%20bellow.`}
        >
          <Bug />
          REPORT A BUG
        </a>
      </div>
    );
  }
}
const mapStateToProps = state => state;
export default connect(mapStateToProps, { getUser })(NavBarLinks);
