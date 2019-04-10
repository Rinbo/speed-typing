import React from "react";

const AuthForm = ({
  showErrors,
  setShowErrors,
  errors,
  password,
  updatePassword,
  name,
  updateName
}) => {
  const renderError = name => {
    return (
      <div className="field">
        <div className="ui error message">
          <p style={{ fontSize: 11 }}>{errors[name]}</p>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className={`field ${showErrors && errors["name"] ? "error" : ""}`}>
        <label style={{ color: "#cccccc", textAlign: "left" }}>Name</label>
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
        className={`field ${showErrors && errors["password"] ? "error" : ""}`}
      >
        <label style={{ color: "#cccccc", textAlign: "left" }}>Password</label>
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
        {showErrors && errors["password"] ? renderError("password") : null}
      </div>
    </>
  );
};

export default AuthForm;
