import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";
import Login from "./components/login";

import FirebaseContext, { withFirebase } from "./firebase/context";
import Firebase from "./firebase/firebase";

export default Firebase;

export { FirebaseContext, withFirebase };

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <Login />
  </FirebaseContext.Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
