import React, { useContext, useState } from "react";
import APIContext from "../context/APIContext";
import NavigationContext from "../context/NavigationContext";
import ConfirmationModal from "../utility/ConfirmationModal";
import { Button, List } from "semantic-ui-react";
import { updateUser, deleteUser } from "../actions/userActions";
import UpdatePassword from "./UpdatePassword";

const UserProfile = () => {
  const apiContext = useContext(APIContext);
  const navigation = useContext(NavigationContext);
  const [email, setEmail] = useState("");
  const [toggle, doToggle] = useState(false);

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
            updateUser({ email }, "update", apiContext.globalDispatch);
          }}
        >
          <div className="ui input">
            <input
              name="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
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

  const deleteAccount = () => {
    deleteUser(apiContext.globalDispatch);
    navigation.selectPage(1);
  };

  return (
    <div style={{ maxWidth: 375 }}>
      <List inverted style={{ marginBottom: 25 }}>
        <List.Item icon="user" content={apiContext.signedInUser} />
        {apiContext.userEmail ? (
          <List.Item icon="mail" content={apiContext.userEmail} />
        ) : (
          renderField()
        )}
      </List>
      {toggle ? (
        <UpdatePassword doToggle={doToggle} />
      ) : (
        <Button
          basic
          inverted
          color="green"
          onClick={() => doToggle(true)}
          style={{ width: 200 }}
        >
          Change password
        </Button>
      )}
      <div>
        <Button
          basic
          inverted
          color="red"
          onClick={deleteUser}
          style={{ width: 200, marginTop: 15 }}
        >
          Delete Account
        </Button>
        <ConfirmationModal
          action={deleteAccount}
          content="Are you sure you want to delete your account?"
          title="Delete Account"
          buttonName="Delete Account"
          accent="red"
        />
      </div>
    </div>
  );
};

export default UserProfile;
