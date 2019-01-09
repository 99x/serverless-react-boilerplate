import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "foundation-sites/dist/css/foundation-float.min.css";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
