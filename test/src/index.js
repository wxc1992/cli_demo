import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {Provider} from "react-redux";
import store from "./store/";
import "./static/js/flexible";
import "./static/style/iconfont/iconfont.css";
import './plugins/axios'
import './main';
import './setupProxy.js'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
