import React from "react";
import { Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import About from "./components/About/About";
import Geolocations from "./components/Geolocations/Geolocations";
import Alert from "./components/Alert/Alert";

export default (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route path="/About" component={About} />
    <Route path="/geolocations" component={Geolocations} />
    <Route path="/alert" component={Alert} />
    <Route
      path="*"
      render={() => {
        return <div>404 NOT FOUND</div>;
      }}
    />
  </Switch>
);
