import React, { Component } from "react";
import endpoint from "../apis/endpoint";
import { setHeaders } from "../apis/setHeaders";

export class Register extends Component {
  state = {
    name: "",
    email: "",
    password: ""
  };

  onSubmit = e => {
    e.preventDefault();
    const body = { ...this.state };

    endpoint
      .post("/users/add", body)
      .then(response => {
        localStorage.setItem("token", response.headers.token);
        setHeaders();
        this.props.signIn(response.data);
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="ui container">
        <div className="ui middle aligned center aligned grid">
          <div className="column" style={{ width: 360 }}>
            <div className="content" style={{ marginBottom: 20 }}>
              It is always more fun to measure yourself against others, so all
              we ask is that you provide a name that we can use to position you
              on the scoreboard:
            </div>
            <form
              className="ui large form"
              onSubmit={this.onSubmit}
              autoComplete="off"
            >
              <div className="ui basic segment">
                <div className="field">
                  <div className="ui left icon input">
                    <i className="user icon" />
                    <input
                      placeholder="Username"
                      onChange={e => {
                        this.setState({ name: e.target.value });
                      }}
                      value={this.state.name}
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="ui left icon input">
                    <i className="mail icon" />
                    <input
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
                      placeholder="Password"
                      onChange={e => {
                        this.setState({ password: e.target.value });
                      }}
                      value={this.state.password}
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
  }
}

export default Register;
