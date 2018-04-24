import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
