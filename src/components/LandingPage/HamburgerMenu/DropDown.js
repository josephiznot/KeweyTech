import React from "react";
import Popover, { PopoverAnimationVertical } from "material-ui/Popover";
import Menu from "material-ui/Menu";
import MenuItem from "material-ui/MenuItem";
import { connect } from "react-redux";
import { handleRequestClose } from "./../../../redux/HamburgerReducer";
import { Link } from "react-router-dom";

function DropDown(props) {
  var { login, signOut, settings, history } = props.HamburgerReducer;

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
          <MenuItem style={{ paddingRight: "30px" }} primaryText={login} />
        </a>
        <a href="http://localhost:3001/logout">
          <MenuItem style={{ paddingRight: "30px" }} primaryText={signOut} />
        </a>
        <Link to="/settings">
          <MenuItem style={{ paddingRight: "30px" }} primaryText={settings} />
        </Link>
        <Link to="/history">
          <MenuItem style={{ paddingRight: "30px" }} primaryText={history} />
        </Link>
      </Menu>
    </Popover>
  );
}
const mapStateToProps = state => state;
export default connect(mapStateToProps, { handleRequestClose })(DropDown);
