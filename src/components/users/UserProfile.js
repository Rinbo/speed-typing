import React, { useContext, useState, useReducer } from "react";
import APIContext from "../context/APIContext";
import { Button, List } from "semantic-ui-react";
import { updateUser } from "../apis/updateUser";
import UpdatePassword from "./UpdatePassword";
import { userReducer, initialUserState } from "../reducers/userReducer";

const UserProfile = () => {
  const apiContext = useContext(APIContext);
  const [address, setAddress] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [state, dispatch] = useReducer(userReducer, initialUserState);

  // @TODO move global store from context to reducers
  console.log(state.data, "This is the data");
  console.log(state.message, "This is the message");

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
            updateUser({ email: address }, "update", dispatch);
          }}
        >
          <div className="ui input">
            <input
              name="email"
              type="email"
              value={address}
              onChange={e => setAddress(e.target.value)}
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
        {state.user.email ? (
          <List.Item icon="mail" content={state.user.email} />
        ) : (
          renderField()
        )}
      </List>
      {showButton ? (
        <UpdatePassword setShowButton={setShowButton} />
      ) : (
        <Button
          basic
          inverted
          color="green"
          onClick={() => {
            setShowButton(true);
          }}
        >
          Change passsword
        </Button>
      )}
    </div>
  );
};

export default UserProfile;
