import React, { useContext, useState } from "react";
import APIContext from "../context/APIContext";
import { Button, List } from "semantic-ui-react";
import endpoint from "../apis/endpoint";
import { setHeaders } from "../apis/setHeaders";
import { parseErr } from "../utility/parseResponse";

const UserProfile = () => {
  const apiContext = useContext(APIContext);
  const [email, setEmail] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    endpoint
      .put("/users/update", { email })
      .then(response => {
        localStorage.setItem("token", response.headers.token);
        setHeaders();
        apiContext.updateUser(response.data);
        apiContext.setStatus("Update successful", 200);
      })
      .catch(err => {
        const [message, statusCode] = parseErr(err);
        apiContext.setStatus(message, statusCode);
      });
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
    <List inverted>
      <List.Item icon="user" content={apiContext.signedInUser} />
      {apiContext.userEmail ? (
        <List.Item icon="mail" content={apiContext.userEmail} />
      ) : (
        renderField()
      )}
    </List>
  );
};

export default UserProfile;
