//SIGNOUT NEEDS SOME
import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import FlatButton from "material-ui/FlatButton";
import Home from "material-ui/svg-icons/action/home";
import "./About.css";
import Bottom from "./Bottom";
import Description from "./Description";
import Stats from "./Stats";
class About extends Component {
  render() {
    return (
      <div className="about-container">
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
          style={{ position: "fixed", paddingTop: 0, background: "#3c8dbc" }}
        />
        <Description />
        <Stats />
        <Bottom />
      </div>
    );
  }
}
export default About;
