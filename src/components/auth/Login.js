import React, { useContext, useState, useEffect } from "react";
import APIContext from "../context/APIContext";
import NavigationContext from "../context/NavigationContext";
import { Button } from "semantic-ui-react";
import { signInUser } from "../actions/userActions";

export default () => {
  const [name, updateName] = useState("");
  const [password, updatePassword] = useState("");
  const [showErrors, setShowErrors] = useState(false);
  const [errors, setErrors] = useState({});
  const apiContext = useContext(APIContext);
  const navigation = useContext(NavigationContext);

  useEffect(() => {
    validations();
  }, [password, name]);

  const validations = () => {
    const errors = {};
    errors.exist = false;
    if (password.length < 6) {
      errors.password = "Password must be 6 characters long or more";
      errors.exist = true;
    }
    if (name.length < 1 || name.length > 15) {
      errors.name = "Name must be between 1 and 15 characters long";
      errors.exist = true;
    }
    setErrors(errors);
  };

  const renderError = name => {
    return (
      <div className="field">
        <div className="ui error message">
          <p style={{ fontSize: 11 }}>{errors[name]}</p>
        </div>
      </div>
    );
  };

  const onSubmit = e => {
    e.preventDefault();
    if (errors.exist) {
      setShowErrors(true);
      return null;
    }
    setShowErrors(false);
    const body = { name, password, score: apiContext.score };
    signInUser(body, apiContext.globalDispatch, navigation);
  };

  return (
    <div className="ui container">
      <div className="ui middle aligned center aligned grid">
        <div className="column" style={{ maxWidth: 360 }}>
          <div className="content" style={{ marginTop: 20 }} />
          <form className="ui large form error" onSubmit={onSubmit}>
            <div className="ui basic segment">
              <div
                className={`field ${
                  showErrors && errors["name"] ? "error" : ""
                }`}
              >
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
                      setShowErrors(false);
                    }}
                    value={name}
                  />
                </div>
                {showErrors && errors["name"] ? renderError("name") : null}
              </div>

              <div
                className={`field ${
                  showErrors && errors["password"] ? "error" : ""
                }`}
              >
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
                      setShowErrors(false);
                    }}
                    value={password}
                  />
                </div>
                {showErrors && errors["password"]
                  ? renderError("password")
                  : null}
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
