import React from "react";
import KeyboardArrowDown from "material-ui/svg-icons/hardware/keyboard-arrow-down";

const Bottom = () => {
  return (
    <div className="about-bottom-container">
      <div className="about-download-container">
        <h1>Try it for yourself</h1>
        {/* <RaisedButton href={process.env.REACT_APP_LOGIN} label="DOWNLOAD" /> */}
        <KeyboardArrowDown
          style={{ width: 55, height: 55 }}
          className="bounce"
        />
        <div className="app-download">
          <a href={process.env.REACT_APP_LOGIN}>
            <img
              src="https://www.usedust.com/img/themes/dust2016/get-it-on-google-play.png"
              alt="google_play_button"
            />
          </a>
          <a href={process.env.REACT_APP_LOGIN}>
            <img
              src="https://www.usedust.com/img/themes/dust2016/download-on-app-store.png"
              alt="apple_store_button"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Bottom;
