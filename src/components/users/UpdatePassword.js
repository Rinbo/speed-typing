import React, { useState, useContext } from "react";
import APIContext from "../context/APIContext";
import { Button } from "semantic-ui-react";
import { parseErr } from "../utility/parseResponse";
import { updatePassword } from "../apis/updateUser";

const UpdatePassword = ({ setShowButton }) => {
  const [password, setPassword] = useState("");
  const apiContext = useContext(APIContext);

  const handleSubmit = async e => {
    e.preventDefault();
    const { status, payload } = await updatePassword({ password });
    if (status === 200) {
      apiContext.setStatus("Update successful", 200);
    } else {
      const [message, statusCode] = parseErr(payload);
      apiContext.setStatus(message, statusCode);
    }
  };

  return (
    <div>
      <form className="ui form" onSubmit={handleSubmit}>
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
