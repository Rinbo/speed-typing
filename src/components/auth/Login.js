import React, { Component } from "react";
import endpoint from "../apis/endpoint";
import { setHeaders } from "../apis/setHeaders";

export class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  onSubmit = e => {
    e.preventDefault();
    const body = { ...this.state };
    console.log(body);
    endpoint
      .post("/users/signin", body)
      .then(response => {
        localStorage.setItem("token", response.headers.token);
        setHeaders();
        this.props.signIn(response.data);
        console.log(response.data);
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="ui container">
        <div className="ui middle aligned center aligned grid">
          <div className="column" style={{ width: 360 }}>
            <div className="content" style={{ marginTop: 20 }}>
              If you already have an account - Login
            </div>
            <form className="ui large form" onSubmit={this.onSubmit}>
              <div className="ui basic segment">
                <div className="field">
                  <div className="ui left icon input">
                    <i className="mail icon" />
                    <input
                      type="text"
                      name="email"
                      placeholder="E-mail address"
                      onChange={e => {
                        this.setState({ email: e.target.value });
                      }}
                      value={this.state.email}
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
                        this.setState({ password: e.target.value });
                      }}
                      value={this.state.password}
                    />
                  </div>
                </div>
                <button
                  className="ui fluid large black submit button"
                >
                  Login
                </button>
              </div>

              <div className="ui error message" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
