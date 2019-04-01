import React, { useContext, useState } from "react";
import APIContext from "../context/APIContext";
import { Button, List } from "semantic-ui-react";
import { parseErr } from "../utility/parseResponse";
import { updateEmail } from "../apis/updateUser";
import UpdatePassword from "./UpdatePassword";

const UserProfile = () => {
  const apiContext = useContext(APIContext);
  const [email, setEmail] = useState("");
  const [showButton, setShowButton] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    const { status, payload } = await updateEmail({ email });
    if (status === 200) {
      apiContext.updateUser(payload);
      apiContext.setStatus("Update successful", 200);
    } else {
      const [message, statusCode] = parseErr(payload);
      apiContext.setStatus(message, statusCode);
    }
  };

  const renderField = () => {
    return (
      <div>
        <div style={{ marginTop: "10px", marginBottom: "10px" }}>
          Register your email address in case you forget your password:
        </div>
        <form className="ui form" onSubmit={handleSubmit}>
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

  return (
    <div>
      <List inverted style={{ marginBottom: 25 }}>
        <List.Item icon="user" content={apiContext.signedInUser} />
        {apiContext.userEmail ? (
          <List.Item icon="mail" content={apiContext.userEmail} />
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
