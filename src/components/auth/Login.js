import React, { useContext, useState, useReducer } from "react";
import APIContext from "../context/APIContext";
import NavigationContext from "../context/NavigationContext";
import { Button } from "semantic-ui-react";
import { signInUser } from "../actions/userActions";
import {
  utilityReducer,
  initialUtilityState
} from "../reducers/utilityReducer";

export default () => {
  const [name, updateName] = useState("");
  const [password, updatePassword] = useState("");
  const apiContext = useContext(APIContext);
  const [, utilityDispatch] = useReducer(utilityReducer, initialUtilityState);
  const navigation = useContext(NavigationContext);

  const onSubmit = e => {
    e.preventDefault();
    const body = { name, password, score: apiContext.score };
    signInUser(body, apiContext.globalDispatch, utilityDispatch);
    navigation.selectPage(1);
  };

  return (
    <div className="ui container">
      <div className="ui middle aligned center aligned grid">
        <div className="column" style={{ maxWidth: 360 }}>
          <div className="content" style={{ marginTop: 20 }} />
          <form className="ui large form" onSubmit={onSubmit}>
            <div className="ui basic segment">
              <div className="field">
                <label style={{ color: "#cccccc", textAlign: "left" }}>
                  Name
                </label>
                <div className="ui left icon input">
                  <i className="user icon" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
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
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={e => {
                      updatePassword(e.target.value);
                    }}
                    value={password}
                  />
                </div>
              </div>
              <Button basic inverted color="green" style={{ width: "100%" }}>
                Login
              </Button>
            </div>

            <div className="ui error message" />
          </form>
        </div>
      </div>
    </div>
  );
};
