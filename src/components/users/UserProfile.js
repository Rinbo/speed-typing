import React, { useContext, useReducer } from "react";
import APIContext from "../context/APIContext";
import { Button, List } from "semantic-ui-react";
import { updateUser } from "../apis/updateUser";
import UpdatePassword from "./UpdatePassword";
import { userReducer, initialUserState } from "../reducers/userReducer";
import {
  utilityReducer,
  initialUtilityState
} from "../reducers/utilityReducer";

const UserProfile = () => {
  const apiContext = useContext(APIContext);
  const [userState, userDispatch] = useReducer(userReducer, initialUserState);
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
              userDispatch,
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
                  type: "updateFormInput",
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
        {userState.user.email ? (
          <List.Item icon="mail" content={userState.user.email} />
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
            utilityDispatch({ type: "doToggle" });
          }}
        >
          Change passsword
        </Button>
      )}
    </div>
  );
};

export default UserProfile;
