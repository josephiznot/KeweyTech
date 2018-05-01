import React from "react";
import Popover, { PopoverAnimationVertical } from "material-ui/Popover";
import Menu from "material-ui/Menu";
import MenuItem from "material-ui/MenuItem";
import { connect } from "react-redux";
import { handleRequestClose } from "./../../../redux/HamburgerReducer";
import { Link } from "react-router-dom";

function DropDown(props) {
  var {
    login,
    signOut,
    settings,
    history,
    geolocations
  } = props.HamburgerReducer;

  return (
    <Popover
      open={props.HamburgerReducer.open}
      anchorEl={props.HamburgerReducer.anchorEl}
      anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      targetOrigin={{ horizontal: "left", vertical: "top" }}
      onRequestClose={props.handleRequestClose}
      animation={PopoverAnimationVertical}
    >
      <Menu
        style={{
          textAlign: "right",
          width: "100vw"
        }}
      >
        <a href="http://localhost:3001/auth">
          <MenuItem
            style={{ paddingRight: "30px" }}
            primaryText={login}
            onClick={props.handleRequestClose}
          />
        </a>
        <a href="http://localhost:3001/logout">
          <MenuItem
            style={{ paddingRight: "30px" }}
            primaryText={signOut}
            onClick={props.handleRequestClose}
          />
        </a>
        <Link to="/geolocations">
          <MenuItem
            style={{ paddingRight: "30px" }}
            primaryText={geolocations}
            onClick={props.handleRequestClose}
          />
        </Link>
        <Link to="/settings">
          <MenuItem
            style={{ paddingRight: "30px" }}
            primaryText={settings}
            onClick={props.handleRequestClose}
          />
        </Link>
        <Link to="/history">
          <MenuItem
            style={{ paddingRight: "30px" }}
            primaryText={history}
            onClick={props.handleRequestClose}
          />
        </Link>
      </Menu>
    </Popover>
  );
}
const mapStateToProps = state => state;
export default connect(mapStateToProps, { handleRequestClose })(DropDown);
