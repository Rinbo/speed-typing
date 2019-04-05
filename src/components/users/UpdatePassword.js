import React, { useState, useReducer } from "react";
import { Button } from "semantic-ui-react";
import { updateUser } from "../apis/updateUser";
import { userReducer, initialUserState } from "../reducers/userReducer";

const UpdatePassword = ({ setShowButton }) => {
  const [password, setPassword] = useState("");
  const [state, dispatch] = useReducer(userReducer, { initialUserState });

  return (
    <div>
      <form
        className="ui form"
        onSubmit={e => {
          e.preventDefault();
          updateUser({ password }, "update", dispatch);
          setShowButton(false);
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
          onClick={() => setShowButton(false)}
          style={{ display: "inline", marginLeft: 20 }}
        >
          X
        </div>
      </form>
    </div>
  );
};

export default UpdatePassword;
