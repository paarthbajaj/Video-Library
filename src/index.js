import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import { VideoContextProvider } from "./context/VideoContext";
import { AuthContextProvider } from "./context/AuthContext";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <VideoContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </VideoContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
