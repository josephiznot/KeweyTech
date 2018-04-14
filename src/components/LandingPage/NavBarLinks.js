import React from "react";
import { connect } from "react-redux";
import "./LandingPage.css";

function NavBarLinks(props) {
  var { menuItem1, menuItem2 } = props.HamburgerReducer;
  return (
    <div className="navbar-links-wrapper">
      <h2>{menuItem1}</h2>
      <h2> {menuItem2}</h2>
    </div>
  );
}
const mapStateToProps = state => state;
export default connect(mapStateToProps)(NavBarLinks);
