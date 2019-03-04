import React from "react";
import Login from "./Login";
import Register from "./Register";

export const Authpage = ({ signIn }) => {
  const renderBlurb = () => {
    return (
      <div className="ui container" style={{ margin: "35px 0px 60px 0px" }}>
        <div style={{ margin: "auto", textAlign: "center" }}>
          <div
            className="ui basic segment"
            style={{
              maxWidth: 600,
              display: "inline-block",
              fontSize: 17
            }}
          >
            This is a typing speed test for coders. For one minute you will be
            presented with random code snippets that you should try to type as
            fast as you can.
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {renderBlurb()}
      <Register signIn={signIn} />
      <div
        className="ui horizontal divider"
        style={{ width: 360, margin: "auto" }}
      >
        OR
      </div>
      <Login signIn={signIn} />
    </div>
  );
};

export default Authpage;
