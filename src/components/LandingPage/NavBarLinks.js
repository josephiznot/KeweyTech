import React from "react";
import { connect } from "react-redux";
import "./LandingPage.css";

function NavBarLinks(props) {
  var { menuItem1, menuItem2 } = props.HamburgerReducer;
  return (
    <div className="navbar-links-wrapper">
      <a href="http://localhost:3001/auth">
        <h2>{menuItem1}</h2>
      </a>
      <h2> {menuItem2}</h2>
    </div>
  );
}
const mapStateToProps = state => state;
export default connect(mapStateToProps)(NavBarLinks);
