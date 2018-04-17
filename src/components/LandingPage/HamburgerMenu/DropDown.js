import React from "react";
import Popover, { PopoverAnimationVertical } from "material-ui/Popover";
import Menu from "material-ui/Menu";
import MenuItem from "material-ui/MenuItem";
import { connect } from "react-redux";
import { handleRequestClose } from "./../../../redux/HamburgerReducer";

function DropDown(props) {
  var { menuItem1, menuItem2 } = props.HamburgerReducer;

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
          <MenuItem style={{ paddingRight: "30px" }} primaryText={menuItem1} />
        </a>
        <a href="http://localhost:3001/logout">
          <MenuItem style={{ paddingRight: "30px" }} primaryText={menuItem2} />
        </a>
      </Menu>
    </Popover>
  );
}
const mapStateToProps = state => state;
export default connect(mapStateToProps, { handleRequestClose })(DropDown);
