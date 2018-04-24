import React from "react";
import KeyboardArrowDown from "material-ui/svg-icons/hardware/keyboard-arrow-down";

const Bottom = () => {
  return (
    <div className="about-bottom-container">
      <div className="about-download-container">
        <h1>Try it for yourself</h1>
        {/* <RaisedButton href="http://localhost:3001/auth" label="DOWNLOAD" /> */}
        <KeyboardArrowDown style={{ width: 55, height: 55 }} />
        <div className="app-download">
          <img
            src="https://www.usedust.com/img/themes/dust2016/get-it-on-google-play.png"
            alt="google_play_button"
          />

          <img
            src="https://www.usedust.com/img/themes/dust2016/download-on-app-store.png"
            alt="apple_store_button"
          />
        </div>
      </div>
    </div>
  );
};

export default Bottom;
