import React, { useContext, useState } from "react";
import endpoint from "../apis/endpoint";
import { setHeaders } from "../apis/setHeaders";
import { parseErr } from "../utility/parseResponse";
import APIContext from "../context/APIContext";
import NavigationContext from "../context/NavigationContext";

export default () => {
  const [name, updateName] = useState("");
  const [password, updatePassword] = useState("");
  const apiContext = useContext(APIContext);
  const navigation = useContext(NavigationContext);

  const onSubmit = e => {
    e.preventDefault();
    endpoint
      .post("/users/signin", { name, password })
      .then(response => {
        localStorage.setItem("token", response.headers.token);
        setHeaders();
        apiContext.signIn(response.data);
        navigation.selectPage(1);
      })
      .catch(err => {
        const [message, statusCode] = parseErr(err);
        apiContext.setStatus(message, statusCode);
      });
  };

  return (
    <div className="ui container">
      <div className="ui middle aligned center aligned grid">
        <div className="column" style={{ maxWidth: 360 }}>
          <div className="content" style={{ marginTop: 20 }} />
          <form className="ui large form" onSubmit={onSubmit}>
            <div className="ui basic segment">
              <div className="field">
                <div className="ui left icon input">
                  <i className="user icon" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={e => {
                      updateName(e.target.value);
                    }}
                    value={name}
                  />
                </div>
              </div>

              <div className="field">
                <div className="ui left icon input">
                  <i className="lock icon" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={e => {
                      updatePassword(e.target.value);
                    }}
                    value={password}
                  />
                </div>
              </div>
              <button className="ui fluid large black submit button">
                Login
              </button>
            </div>

            <div className="ui error message" />
          </form>
        </div>
      </div>
    </div>
  );
};
