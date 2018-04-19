import React from "react";
import RaisedButton from "material-ui/RaisedButton";
const Bottom = () => {
  return (
    <div className="about-bottom-container">
      <div className="about-download-container">
        <h1>Try it for yourself</h1>
        <RaisedButton href="http://localhost:3001/auth" label="DOWNLOAD" />
      </div>
    </div>
  );
};

export default Bottom;
