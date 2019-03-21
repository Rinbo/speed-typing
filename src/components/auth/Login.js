import React, { useContext, useState } from "react";
import endpoint from "../apis/endpoint";
import { setHeaders } from "../apis/setHeaders";
import { parseErr } from "../utility/parseResponse";
import AuthContext from "../context/APIContext";

export default () => {
  const [email, updateEmail] = useState("");
  const [password, updatePassword] = useState("");
  const authContext = useContext(AuthContext);

  const onSubmit = e => {
    e.preventDefault();
    endpoint
      .post("/users/signin", { email: email, password: password })
      .then(response => {
        localStorage.setItem("token", response.headers.token);
        setHeaders();
        authContext.signIn(response.data);
      })
      .catch(err => {
        const [message, statusCode] = parseErr(err);
        authContext.setStatus(message, statusCode);
      });
  };

  return (
    <div className="ui container">
      <div className="ui middle aligned center aligned grid">
        <div className="column" style={{ maxWidth: 360 }}>
          <div className="content" style={{ marginTop: 20 }}>
            If you already have an account - Login
          </div>
          <form className="ui large form" onSubmit={onSubmit}>
            <div className="ui basic segment">
              <div className="field">
                <div className="ui left icon input">
                  <i className="mail icon" />
                  <input
                    type="text"
                    name="email"
                    placeholder="E-mail address"
                    onChange={e => {
                      updateEmail(e.target.value);
                    }}
                    value={email}
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
