import React from "react";

import IconButton from "material-ui/IconButton";
import "./../LandingPage.css";
import MenuIcon from "./MenuIcon";
import DropDown from "./DropDown";
import { connect } from "react-redux";
import { handleClick } from "./../../../redux/HamburgerReducer";

function HamburgerMenu(props) {
  return (
    <div>
      <div className="hamburger-wrapper">
        <IconButton onClick={props.handleClick}>
          <MenuIcon />
        </IconButton>
      </div>
      <DropDown />
    </div>
  );
}
const mapStateToProps = state => state;
export default connect(mapStateToProps, { handleClick })(HamburgerMenu);
