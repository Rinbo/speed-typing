import React, { useState, useContext } from "react";
import { Button } from "semantic-ui-react";
import { updateUser } from "../actions/userActions";
import APIContext from "../context/APIContext";

const UpdatePassword = ({ doToggle }) => {
  const apiContext = useContext(APIContext);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reveal, toggleReveal] = useState(false);

  const onSubmit = e => {
    e.preventDefault();
    if (newPassword.length < 6) {
      apiContext.globalDispatch({
        type: "FLASH_MESSAGE",
        payload: {
          message: "Your new password must be atleast 6 characters long",
          status: 400
        }
      });
      return null;
    }
    updateUser({ password, newPassword }, "update", apiContext.globalDispatch);
    doToggle(false);
  };

  return (
    <div>
      <form className="ui form" onSubmit={onSubmit}>
        <div className="field">
          <label style={{ color: "#cccccc", textAlign: "left" }}>
            Current Password
          </label>
          <div className="ui input">
            <input
              type={reveal ? "" : "password"}
              placeholder="Current Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ maxWidth: 200 }}
            />
          </div>
        </div>

        <div className="field">
          <label style={{ color: "#cccccc", textAlign: "left" }}>
            New Password
          </label>
          <div className="ui input">
            <input
              type={reveal ? "" : "password"}
              placeholder="New Password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              style={{ maxWidth: 200 }}
            />
          </div>
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
