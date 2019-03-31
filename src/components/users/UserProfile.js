import React, { useContext, useState } from "react";
import APIContext from "../context/APIContext";
import { Button } from "semantic-ui-react";
import useUserUpdate from "../apis/useUserUpdate";

const UserProfile = () => {
  const apiContext = useContext(APIContext);
  const [email, setEmail] = useState("");

  const handleSubmit = () => useUserUpdate({ email });

  const renderField = () => {
    return (
      <div>
        <div>Register your email address in case you forget your password:</div>
        <form className="ui form" onSubmit={handleSubmit()}>
          <div className="ui input">
            <input
              name="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{ maxWidth: 200 }}
            />
            <Button basic color="green">
              Save
            </Button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div className="Your profile">
      <div>Your name: {apiContext.signedInUser}</div>
      {apiContext.userEmail
        ? `Your email address: ${apiContext.userEmail}`
        : renderField()}
    </div>
  );
};

export default UserProfile;
