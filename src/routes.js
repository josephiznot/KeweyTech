import React from "react";
import { Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import About from "./components/About/About";

export default (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route path="/About" component={About} />
    <Route
      path="*"
      render={() => {
        return <div>404 NOT FOUND</div>;
      }}
    />
  </Switch>
);
