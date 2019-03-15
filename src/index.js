import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { AuthStore } from "./components/auth/AuthContext";

const Provider = () => {
  return (
    <AuthStore>
      <div className="ui container" style={{ marginTop: 100 }}>
        <App />
      </div>
    </AuthStore>
  );
};

ReactDOM.render(<Provider />, document.getElementById("root"));
