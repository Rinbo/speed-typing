import React from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import "./components/app.css";
import App from "./components/App";
import { AuthStore } from "./components/context/APIContext";
import { Navigation } from "./components/context/NavigationContext";
import StatusMessage from "./components/utility/StatusMessage";

const AppWrapper = () => {
  return (
    <Navigation>
      <AuthStore>
        <StatusMessage />
        <div className="ui container" style={{ marginTop: 100 }}>
          <App />
        </div>
      </AuthStore>
    </Navigation>
  );
};

ReactDOM.render(<AppWrapper />, document.getElementById("root"));
