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
        <Description />
        <Stats />
        <Bottom />
      </div>
    );
  }
}
export default About;
