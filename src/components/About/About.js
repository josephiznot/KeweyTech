//SIGNOUT NEEDS SOME
import React, { Component } from "react";

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
