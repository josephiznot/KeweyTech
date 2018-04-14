import React from "react";

import AppBar from "material-ui/AppBar";
import HamburgerMenu from "./HamburgerMenu/HamburgerMenu";
import IntroQ from "./IntroQ/IntroQ";
import { Link } from "react-router-dom";
import NavBarLinks from "./NavBarLinks";

const LandingPage = () => {
  const styles = {
    noDecoration: {
      textDecoration: "none"
    }
  };
  return (
    <div>
      <AppBar
        showMenuIconButton={false}
        iconElementRight={<HamburgerMenu />}
        title={<NavBarLinks />}
        style={{ background: "#3c8dbc" }}
        zDepth={1}
      />
      <Link style={styles.noDecoration} to="/About">
        <IntroQ />
      </Link>
    </div>
  );
};
export default LandingPage;
