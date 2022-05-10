import React from "react";
import ReactDOM from "react-dom";
import "simple-line-icons/css/simple-line-icons.css";

import { register } from "@/sw";

import "@/scss";
import App from "@/components/App";

ReactDOM.render(<App />, document.getElementById("root"));

if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
  register();
}
