import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { AuthStore } from "./components/context/APIContext";
import StatusMessage from "./components/utility/StatusMessage";

const AppWrapper = () => {
  return (
    <AuthStore>
      <StatusMessage />
      <div className="ui container" style={{ marginTop: 100 }}>
        <App />
      </div>
    </AuthStore>
  );
};

ReactDOM.render(<AppWrapper />, document.getElementById("root"));
