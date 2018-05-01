import React from "react";
import Popover, { PopoverAnimationVertical } from "material-ui/Popover";
import Menu from "material-ui/Menu";
import MenuItem from "material-ui/MenuItem";
import { Link } from "react-router-dom";

function DropDown(props) {
  var {
    login,
    signOut,
    settings,
    history,
    geolocations,
    open,
    anchorEl
  } = props;

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
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
export default DropDown;
