import React, { useState, useContext } from "react";
import { Button } from "semantic-ui-react";
import { updateUser } from "../actions/userActions";
import APIContext from "../context/APIContext";

const UpdatePassword = ({ doToggle }) => {
  const apiContext = useContext(APIContext);
  const [password, setPassword] = useState("");

  return (
    <div>
      <form
        className="ui form"
        onSubmit={e => {
          e.preventDefault();
          updateUser({ password }, "update", apiContext.globalDispatch);
          doToggle(false);
        }}
      >
        <div className="ui input">
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ maxWidth: 200 }}
          />
          <Button basic inverted color="green" style={{ marginLeft: 10 }}>
            Save
          </Button>
        </div>
        <div
          className="ui inverted basic button"
          onClick={() => doToggle(false)}
          style={{ display: "inline", marginLeft: 20 }}
        >
          X
        </div>
      </form>
    </div>
  );
};

export default UpdatePassword;
