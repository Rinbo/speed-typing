import React, { useReducer } from "react";
import { Button } from "semantic-ui-react";
import { updateUser } from "../apis/updateUser";
import { userReducer, initialUserState } from "../reducers/userReducer";
import {
  utilityReducer,
  initialUtilityState
} from "../reducers/utilityReducer";

const UpdatePassword = ({ parentUtilityDispatch }) => {
  const [, userDispatch] = useReducer(userReducer, {
    initialUserState
  });
  const [utilityState, utilityDispatch] = useReducer(
    utilityReducer,
    initialUtilityState
  );

  return (
    <div>
      <form
        className="ui form"
        onSubmit={e => {
          e.preventDefault();
          updateUser(
            { password: utilityState.formInput },
            "update",
            userDispatch,
            utilityDispatch
          );
          parentUtilityDispatch({ type: "doToggle" });
        }}
      >
        <div className="ui input">
          <input
            type="password"
            value={utilityState.formInput}
            onChange={e =>
              utilityDispatch({ type: "setFormInput", payload: e.target.value })
            }
            style={{ maxWidth: 200 }}
          />
          <Button basic inverted color="green" style={{ marginLeft: 10 }}>
            Save
          </Button>
        </div>
        <div
          className="ui inverted basic button"
          onClick={() => parentUtilityDispatch({ type: "doToggle" })}
          style={{ display: "inline", marginLeft: 20 }}
        >
          X
        </div>
      </form>
    </div>
  );
};

export default UpdatePassword;
