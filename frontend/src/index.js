import "./styles.scss";
import "bootstrap";

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { io } from "socket.io-client";
import store from "./slices/index";
import reportWebVitals from "./reportWebVitals";

import App from "./components/App";
import AuthProvider from "./contexts/AuthContext";
import WSocketProvider from "./contexts/WScontext";
import init from "./init";

// const socket = io();
const socket = io().connect("http://localhost:3000");
init(socket);

const root = ReactDOM.createRoot(document.getElementById("chat"));
root.render(
  <Provider store={store}>
    <WSocketProvider socket={socket}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </WSocketProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
