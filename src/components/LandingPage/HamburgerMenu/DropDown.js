import React from "react";
import Popover, { PopoverAnimationVertical } from "material-ui/Popover";
import Menu from "material-ui/Menu";
import MenuItem from "material-ui/MenuItem";
import { Link } from "react-router-dom";
import History from "material-ui/svg-icons/action/history";
import Setting from "material-ui/svg-icons/action/settings";
import Location from "material-ui/svg-icons/communication/location-on";
import SignIn from "material-ui/svg-icons/action/fingerprint";
import Logout from "material-ui/svg-icons/action/power-settings-new";

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
        {!props.isLoggedIn ? (
          <a href={process.env.REACT_APP_LOGIN}>
            <MenuItem
              rightIcon={<SignIn />}
              style={{ paddingRight: "30px" }}
              primaryText={login}
              onClick={props.handleRequestClose}
            />
          </a>
        ) : (
          <a href={process.env.REACT_APP_LOGOUT}>
            <MenuItem
              rightIcon={<Logout />}
              style={{ paddingRight: "30px" }}
              primaryText={signOut}
              onClick={props.handleRequestClose}
            />
          </a>
        )}
        <Link to="/geolocations">
          <MenuItem
            rightIcon={<Location />}
            style={{ paddingRight: "30px" }}
            primaryText={geolocations}
            onClick={props.handleRequestClose}
          />
        </Link>
        <Link to="/settings">
          <MenuItem
            rightIcon={<Setting />}
            style={{ paddingRight: "30px" }}
            primaryText={settings}
            onClick={props.handleRequestClose}
          />
        </Link>
        <Link to="/history">
          <MenuItem
            rightIcon={<History />}
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
