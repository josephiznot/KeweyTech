import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./LandingPage.css";

function NavBarLinks(props) {
  var { menuItem1, menuItem2 } = props.HamburgerReducer;
  return (
    <div id="navbar-links-wrapper">
      <a href={process.env.REACT_APP_LOGIN}>
        <h2>LOGIN/SIGNUP</h2>
      </a>|
      <a href={process.env.REACT_APP_LOGOUT}>
        <h2>SIGNOUT</h2>
      </a>|
      <Link to="/history">
        <h2> HISTORY</h2>
      </Link>|
      <Link to="/settings">
        <h2> ADMIN SETTINGS</h2>
      </Link>|
      <Link to="/geolocations">
        <h2> KEWEY FENCES</h2>
      </Link>
    </div>
  );
}
const mapStateToProps = state => state;
export default connect(mapStateToProps)(NavBarLinks);
