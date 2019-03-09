import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { AuthStore } from "./components/auth/AuthContext";

const Provider = () => {
  return (
    <AuthStore>
      <App />
    </AuthStore>
  );
};

ReactDOM.render(<Provider />, document.getElementById("root"));
