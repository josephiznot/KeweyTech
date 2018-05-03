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
import swal from "sweetalert";

class App extends Component {
  render() {
    // if (true) {
    //   this.props.history.push("/alert");
    // // }

    return (
      //I am conditionally rendering a different appbar based on route location
      <div>
        <nav className="geolocations-nav">
          {this.props.history.location.pathname === "/" ? (
            <AppBar
              showMenuIconButton={false}
              iconElementRight={<HamburgerMenu />}
              title={<NavBarLinks />}
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
                    href="http://localhost:3001/auth" //not sure why the button is pushed up when i add the anchor tag to this...
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
                  {this.props.userReducer.user.display_name}
                </ListItem>
              }
              iconElementRight={<HamburgerMenu />}
              title={<NavBarLinks />}
              style={{ background: "#3c8dbc" }}
              zDepth={1}
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
