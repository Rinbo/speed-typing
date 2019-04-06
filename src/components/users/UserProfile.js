import React, { useContext, useReducer } from "react";
import APIContext from "../context/APIContext";
import { Button, List } from "semantic-ui-react";
import { updateUser } from "../actions/userActions";
import UpdatePassword from "./UpdatePassword";
import { userReducer, initialUserState } from "../reducers/userReducer";
import {
  utilityReducer,
  initialUtilityState
} from "../reducers/utilityReducer";

const UserProfile = () => {
  const apiContext = useContext(APIContext);
  const [utilityState, utilityDispatch] = useReducer(
    utilityReducer,
    initialUtilityState
  );

  const renderField = () => {
    return (
      <div>
        <div style={{ marginTop: "10px", marginBottom: "10px" }}>
          Register your email address in case you forget your password:
        </div>
        <form
          className="ui form"
          onSubmit={e => {
            e.preventDefault();
            updateUser(
              { email: utilityState.formInput },
              "update",
              apiContext.globalDispatch,
              utilityDispatch
            );
          }}
        >
          <div className="ui input">
            <input
              name="email"
              type="email"
              value={utilityState.formInput}
              onChange={e =>
                utilityDispatch({
                  type: "UPDATE_FORM_INPUT",
                  payload: e.target.value
                })
              }
              style={{ maxWidth: 200 }}
            />
            <Button basic inverted color="green" style={{ marginLeft: 10 }}>
              Save
            </Button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div>
      <List inverted style={{ marginBottom: 25 }}>
        <List.Item icon="user" content={apiContext.signedInUser} />
        {apiContext.email ? (
          <List.Item icon="mail" content={apiContext.email} />
        ) : (
          renderField()
        )}
      </List>
      {utilityState.toggle ? (
        <UpdatePassword parentUtilityDispatch={utilityDispatch} />
      ) : (
        <Button
          basic
          inverted
          color="green"
          onClick={() => {
            utilityDispatch({ type: "DO_TOGGLE" });
          }}
        >
          Change passsword
        </Button>
      )}
    </div>
  );
};

export default UserProfile;
