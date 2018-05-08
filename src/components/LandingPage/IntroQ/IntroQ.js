import React from "react";

import "./IntroQ.css";
import TouchApp from "material-ui/svg-icons/action/touch-app";

const IntroQ = () => {
  return (
    <div className="intro-q-container">
      <div className="intro-question">
        <p>What is Kewey?</p>
        <div className="message-wing" />
      </div>
      <div className="pulsing" />
      <TouchApp />
    </div>
  );
};
export default IntroQ;
