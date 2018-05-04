import React from "react";

import IconButton from "material-ui/IconButton";
import "./../LandingPage.css";
import MenuIcon from "./MenuIcon";
import DropDown from "./DropDown";
import { connect } from "react-redux";
import { handleClick } from "./../../../redux/HamburgerReducer";
import { getUser } from "./../../../redux/userReducer";

class HamburgerMenu extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
      login: "LOGIN/SIGNUP_",
      signOut: "SIGN OUT",
      settings: "SETTINGS",
      keweyFence: "KEWEY FENCE",
      about: "ABOUT",
      history: "HISTORY",
      geolocations: "GEOLOCATIONS"
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }
  handleClick = event => {
    var { open } = this.state;
    event.preventDefault();
    this.setState({ anchorEl: event.currentTarget, open: !open });
  };
  handleRequestClose = () => {
    this.setState({ open: false });
  };
  componentDidMount() {
    this.props
      .getUser()
      .then(response => {
        this.setState({ isLoggedIn: true });
      })
      .catch(err => {
        err ? this.setState({ isLoggedIn: false }) : err;
      });
  }
  render() {
    const {
      login,
      signOut,
      settings,
      history,
      geolocations,
      open,
      anchorEl,
      isLoggedIn
    } = this.state;
    return (
      <div>
        <div className="hamburger-wrapper">
          <IconButton onClick={this.handleClick}>
            <MenuIcon />
          </IconButton>
        </div>
        <DropDown
          login={login}
          signOut={signOut}
          settings={settings}
          history={history}
          geolocations={geolocations}
          handleRequestClose={this.handleRequestClose}
          anchorEl={anchorEl}
          open={open}
          isLoggedIn={isLoggedIn}
        />
      </div>
    );
  }
}
const mapStateToProps = state => state;
export default connect(mapStateToProps, { handleClick, getUser })(
  HamburgerMenu
);
