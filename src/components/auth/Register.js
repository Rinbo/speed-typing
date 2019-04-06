import React, { useContext, useReducer, useState } from "react";
import APIContext from "../context/APIContext";
import NavigationContext from "../context/NavigationContext";
import { Button } from "semantic-ui-react";
import { signUpUser } from "../actions/userActions";
import {
  utilityReducer,
  initialUtilityState
} from "../reducers/utilityReducer";

export const Register = ({ score }) => {
  const [name, updateName] = useState("");
  const [password, updatePassword] = useState("");
  const [, utilityDispatch] = useReducer(utilityReducer, initialUtilityState);
  const apiContext = useContext(APIContext);
  const navigation = useContext(NavigationContext);

  const onSubmit = e => {
    e.preventDefault();
    const body = { name, password, score };
    signUpUser(body, apiContext.globalDispatch, utilityDispatch);
    navigation.selectPage(1);
  };

  return (
    <div className="ui container">
      <div className="ui middle aligned center aligned grid">
        <div className="column" style={{ maxWidth: 360 }}>
          <div className="content" style={{ marginBottom: 20 }}>
            Register an account and see how you measure up against others on the
            scoreboard:
          </div>
          <form className="ui large form" onSubmit={onSubmit}>
            <div className="ui basic segment">
              <div className="field">
                <label style={{ color: "#cccccc", textAlign: "left" }}>
                  Name
                </label>

                <div className="ui left icon input">
                  <i className="user icon" />
                  <input
                    placeholder="Username"
                    autoComplete="off"
                    name="name"
                    type="text"
                    onChange={e => {
                      updateName(e.target.value);
                    }}
                    value={name}
                  />
                </div>
              </div>
              <div className="field">
                <label style={{ color: "#cccccc", textAlign: "left" }}>
                  Password
                </label>
                <div className="ui left icon input">
                  <i className="lock icon" />
                  <input
                    autoComplete="off"
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={e => {
                      updatePassword(e.target.value);
                    }}
                    value={password}
                  />
                </div>
              </div>
              <Button basic inverted color="green" style={{ width: "100%" }}>
                Register!
              </Button>
            </div>
          </form>
          <div
            className="ui horizontal divider"
            style={{ maxWidth: 360, margin: "auto", color: "#cccccc" }}
          >
            OR
          </div>
          <p style={{ textAlign: "center", marginTop: 15 }}>
            If you already have an account
          </p>
          <Button
            style={{ display: "block", margin: "auto" }}
            basic
            inverted
            color="green"
            onClick={() => navigation.selectPage(5)}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Register;
