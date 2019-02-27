import React, { Component } from "react";
import endpoint from "../../endpoint";

export class DeleteUser extends Component {
  deleteUser = () => {
    endpoint
      .delete("/users/2")
      .then(res => console.log(res))
      .catch(e => console.log(e));
  };

  render() {
    return (
      <div>
        <button className="ui button primary" onClick={this.deleteUser}>
          Delete you account
        </button>
      </div>
    );
  }
}

export default DeleteUser;
