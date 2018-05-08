import React, { Component } from "react";

import routes from "./routes";
import AppBar from "material-ui/AppBar";
import NavBarLinks from "./components/LandingPage/NavBarLinks";
import HamburgerMenu from "./components/LandingPage/HamburgerMenu/HamburgerMenu";
import Avatar from "material-ui/Avatar";
import ListItem from "material-ui/List/ListItem";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import IconButton from "material-ui/IconButton";
import FlatButton from "material-ui/FlatButton";
import Home from "material-ui/svg-icons/action/home";
import { getUser } from "./redux/userReducer";
import Location from "material-ui/svg-icons/device/location-searching";
import "./App.css";

class App extends Component {
  render() {
    return (
      //I am conditionally rendering a different appbar based on route location
      <div>
        <nav className="geolocations-nav">
          {this.props.history.location.pathname === "/" ? (
            <AppBar
              title={
                this.props.geolocationsReducer.searchToggle ? (
                  <div className="blink-me">
                    <Location />
                    <div>TRACKING</div>
                  </div>
                ) : null
              }
              showMenuIconButton={false}
              iconElementRight={
                <div className="icon-right-container">
                  <HamburgerMenu /> <NavBarLinks />
                </div>
              }
              style={{ background: "#3c8dbc" }}
              zDepth={1}
            />
          ) : this.props.history.location.pathname === "/about" ? (
            <AppBar
              iconElementLeft={
                <IconButton
                  href="/"
                  iconStyle={{ width: 40, height: 40 }}
                  style={{ width: 60, height: 60, padding: 2 }}
                >
                  <Home />
                </IconButton>
              }
              title="Kewey"
              titleStyle={{ height: 68 }}
              iconElementRight={
                <div>
                  <FlatButton
                    label="SIGNUP"
                    style={{ width: 60, height: 60, padding: 6 }}
                    href={process.env.REACT_APP_LOGIN} //not sure why the button is pushed up when i add the anchor tag to this...
                  />
                </div>
              }
              style={{
                position: "fixed",
                paddingTop: 0,
                background: "#3c8dbc"
              }}
            />
          ) : this.props.history.location.pathname === "/alert" ? (
            <div />
          ) : (
            <AppBar
              iconElementLeft={
                <ListItem
                  leftAvatar={
                    <Avatar src={this.props.userReducer.user.profile_pic} />
                  }
                >
                  <h4 className="user-name-container">
                    {this.props.userReducer.user.display_name}
                  </h4>
                </ListItem>
              }
              iconElementRight={
                <div className="icon-right-container">
                  <HamburgerMenu /> <NavBarLinks />
                </div>
              }
              style={{ background: "#3c8dbc" }}
              zDepth={1}
              title={
                this.props.geolocationsReducer.searchToggle ? (
                  <div className="blink-me">
                    <Location />
                    TRACKING...
                  </div>
                ) : null
              }
            />
          )}
        </nav>
        {routes}
      </div>
    );
  }
}
const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps, { getUser })(App));
