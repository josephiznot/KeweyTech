import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import Download from "./Download";

function Description() {
  return (
    <div className="about-description-container">
      <div className="about-slanted-container">
        <div className="flex-container">
          <div className="about-description-body">
            <h1>Never worry about your child's safety ever again</h1>
            <p>
              The easiest and most efficient way for parents to ensure the
              security and well-being of their children
            </p>
            <RaisedButton
              label={"Install Now - FREE"}
              icon={<Download />}
              style={{
                borderRadius: 7
              }}
              buttonStyle={{
                height: 70,
                width: 260,
                background: "#333",
                opacity: 0.89,
                borderRadius: 7,
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
              labelStyle={{ color: "white", fontSize: 21 }}
              href="http://localhost:3001/auth" //not sure why the div changes size when you add a href prop
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Description;
