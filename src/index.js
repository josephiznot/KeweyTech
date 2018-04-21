import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { HashRouter } from "react-router-dom";
import routes from "./routes";
import { Provider } from "react-redux";
import store from "./redux/store";
//Each page is rendering a different navbar
import NavBarLinks from "./components/LandingPage/NavBarLinks";
import HamburgerMenu from "./components/LandingPage/HamburgerMenu/HamburgerMenu";
import AppBar from "material-ui/AppBar";

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <HashRouter>
        <div>
          {/* <AppBar
            showMenuIconButton={false}
            iconElementRight={<HamburgerMenu />}
            title={<NavBarLinks />}
            style={{ background: "#3c8dbc" }}
            zDepth={1}
          /> */}
          {routes}
        </div>
      </HashRouter>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
