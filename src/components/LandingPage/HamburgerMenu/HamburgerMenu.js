import React from "react";

import IconButton from "material-ui/IconButton";
import "./../LandingPage.css";
import MenuIcon from "./MenuIcon";
import DropDown from "./DropDown";
import { connect } from "react-redux";
import { handleClick } from "./../../../redux/HamburgerReducer";
import { getUser } from "./../../../redux/userReducer";
// import MenuIcon from "material-ui/svg-icons/navigation/menu";

class HamburgerMenu extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
      login: "LOGIN/SIGNUP",
      signOut: "SIGN OUT",
      settings: "ADMIN SETTINGS",
      keweyFence: "KEWEY FENCES",
      about: "ABOUT",
      history: "HISTORY",
      geolocations: "GEOLOCATIONS",
      bug: "REPORT A BUG"
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
      isLoggedIn,
      keweyFence,
      bug
    } = this.state;
    return (
      <div className="burger-container">
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
          geolocations={keweyFence}
          handleRequestClose={this.handleRequestClose}
          anchorEl={anchorEl}
          open={open}
          isLoggedIn={isLoggedIn}
          bug={bug}
        />
      </div>
    );
  }
}
const mapStateToProps = state => state;
export default connect(mapStateToProps, { handleClick, getUser })(
  HamburgerMenu
);
