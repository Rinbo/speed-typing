import React, { useContext, useState } from "react";
import endpoint from "../apis/endpoint";
import { setHeaders } from "../apis/setHeaders";
import { parseErr } from "../utility/parseResponse";
import APIContext from "../context/APIContext";
import NavigationContext from "../context/NavigationContext";

export const Register = ({ score }) => {
  const [name, updateName] = useState("");
  const [password, updatePassword] = useState("");
  const apiContext = useContext(APIContext);
  const navigation = useContext(NavigationContext);
  const onSubmit = e => {
    e.preventDefault();

    const signupScore = score;
    const body = { name, password, score: signupScore };

    endpoint
      .post("/users/add", body)
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
          <div className="content" style={{ marginBottom: 20 }}>
            Register an account and see how you measure up against others on the
            scoreboard:
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
                Register!
              </button>
            </div>
          </form>
          <div
            className="ui horizontal divider"
            style={{ maxWidth: 360, margin: "auto" }}
          >
            OR
          </div>
          <p style={{ textAlign: "center", marginTop: 15 }}>
            If you already have an account
          </p>
          <button
            style={{ display: "block", margin: "auto" }}
            className="ui button basic black"
            onClick={() => navigation.selectPage(5)}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
