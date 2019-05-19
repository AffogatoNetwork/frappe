import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { theme, ThemeProvider } from "rimble-ui";
import * as serviceWorker from "./serviceWorker";

const coffee = {
  ...theme,
  colors: {
    primary: "#332211",
    black: "#3f3d4b",
    white: "#fff",
    blue: "#007ce0",
    navy: "#004175",
    secondary: "#cc7722"
  }
};

ReactDOM.render(
  <ThemeProvider theme={coffee}>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
