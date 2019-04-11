import React, { useState, useContext, useEffect } from "react";
import { Button } from "semantic-ui-react";
import { updateUser } from "../actions/userActions";
import APIContext from "../context/APIContext";

const UpdatePassword = ({ doToggle }) => {
  const apiContext = useContext(APIContext);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reveal, toggleReveal] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    validations();
  }, [password, newPassword]);

  const validations = () => {
    const errors = {};
    errors.exist = false;
    const commonMessage = "Password must be atleast six characters long";
    if (password.length < 6) {
      errors.password = commonMessage;
      errors.exist = true;
    }
    if (newPassword.length < 6) {
      errors.newPassword = commonMessage;
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
    updateUser(
      { password, newPw: newPassword },
      "update",
      apiContext.globalDispatch
    );
    doToggle(false);
  };

  return (
    <div>
      <form className="ui form error" onSubmit={onSubmit}>
        <div className="field">
          <label style={{ color: "#cccccc", textAlign: "left" }}>
            Current Password
          </label>
          <div
            className={`field ${
              showErrors && errors["password"] ? "error" : ""
            }`}
          >
            <div className="ui input">
              <input
                type={reveal ? "" : "password"}
                placeholder="Current Password"
                value={password}
                name="current-password"
                onChange={e => {
                  setPassword(e.target.value);
                  setShowErrors(false);
                }}
                style={{ maxWidth: 200 }}
              />
            </div>
          </div>
          {showErrors && errors["password"] ? renderError("password") : null}
        </div>

        <div className="field">
          <label style={{ color: "#cccccc", textAlign: "left" }}>
            New Password
          </label>
          <div
            className={`field ${
              showErrors && errors["newPassword"] ? "error" : ""
            }`}
          >
            <div className="ui input">
              <input
                type={reveal ? "" : "password"}
                placeholder="New Password"
                value={newPassword}
                name="new-password"
                onChange={e => {
                  setNewPassword(e.target.value);
                  setShowErrors(false);
                }}
                style={{ maxWidth: 200 }}
              />
            </div>
          </div>
          {showErrors && errors["newPassword"]
            ? renderError("newPassword")
            : null}
        </div>

        <div className="field">
          <Button basic inverted color="green" style={{ width: 100 }}>
            Save
          </Button>
          <div
            className="ui inverted basic button"
            onClick={() => toggleReveal(!reveal)}
            style={{ width: 100 }}
          >
            {reveal ? "Hide" : "Reveal"}
          </div>
          <div
            className="ui inverted basic button"
            onClick={() => doToggle(false)}
            style={{ marginLeft: 10 }}
          >
            X
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdatePassword;
