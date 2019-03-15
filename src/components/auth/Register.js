import React, { useContext, useState } from "react";
import endpoint from "../apis/endpoint";
import { setHeaders } from "../apis/setHeaders";
import AuthContext from "./AuthContext";

export const Register = () => {
  const [name, updateName] = useState("");
  const [email, updateEmail] = useState("");
  const [password, updatePassword] = useState("");
  const authContext = useContext(AuthContext);

  const onSubmit = e => {
    e.preventDefault();
    const body = { name: name, email: email, password: password };

    endpoint
      .post("/users/add", body)
      .then(response => {
        localStorage.setItem("token", response.headers.token);
        setHeaders();
        authContext.signIn(response.data);
      })
      .catch(err => {
        console.log(err.response.data);
        let details = err.response.data.details.split(";");
        if (details.length > 2) {
          console.log(
            details[details.length - 1]
              .replace("default message [", "")
              .replace("]", "")
          );
        }
      });
  };

  return (
    <div className="ui container">
      <div className="ui middle aligned center aligned grid">
        <div className="column" style={{ maxWidth: 360 }}>
          <div className="content" style={{ marginBottom: 20 }}>
            It is always more fun to measure yourself against others, so all we
            ask is that you provide a name that we can use to position you on
            the scoreboard:
          </div>
          <form
            className="ui large form"
            onSubmit={onSubmit}
            autoComplete="off"
          >
            <div className="ui basic segment">
              <div className="field">
                <div className="ui left icon input">
                  <i className="user icon" />
                  <input
                    placeholder="Username"
                    onChange={e => {
                      updateName(e.target.value);
                    }}
                    value={name}
                  />
                </div>
              </div>
              <div className="field">
                <div className="ui left icon input">
                  <i className="mail icon" />
                  <input
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
                    placeholder="Password"
                    onChange={e => {
                      updatePassword(e.target.value);
                    }}
                    value={password}
                  />
                </div>
              </div>
              <button className="ui fluid large black submit button">
                Go!
              </button>
            </div>

            <div className="ui error message" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
