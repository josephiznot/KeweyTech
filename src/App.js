import React, { Component } from "react";

import LandingPage from "./components/LandingPage/LandingPage";

class App extends Component {
  render() {
    if (true) {
      this.props.history.push("/alert");
    }
    return (
      <div>
        <LandingPage />
      </div>
    );
  }
}

export default App;
