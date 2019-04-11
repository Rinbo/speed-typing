import React, { useContext, useState, useEffect } from "react";
import APIContext from "../context/APIContext";
import NavigationContext from "../context/NavigationContext";
import { Button } from "semantic-ui-react";
import { signUpUser } from "../actions/userActions";
import { validations } from "./authValidations";
import AuthForm from "./AuthForm";

export const Register = ({ score }) => {
  const [name, updateName] = useState("");
  const [password, updatePassword] = useState("");
  const [showErrors, setShowErrors] = useState(false);
  const [errors, setErrors] = useState({});
  const apiContext = useContext(APIContext);
  const navigation = useContext(NavigationContext);

  useEffect(() => {
    validations(name, password, setErrors);
  }, [password, name]);

  const onSubmit = e => {
    e.preventDefault();
    if (errors.exist) {
      setShowErrors(true);
      return null;
    }
    setShowErrors(false);
    const body = { name, password, score };
    signUpUser(body, apiContext.globalDispatch, navigation);
  };

  return (
    <div className="ui container">
      <div className="ui middle aligned center aligned grid">
        <div className="column" style={{ maxWidth: 360 }}>
          <div className="content" style={{ marginBottom: 20 }}>
            Register an account and see how you measure up against others on the
            scoreboard:
          </div>
          <form className="ui large form error" onSubmit={onSubmit}>
            <div className="ui basic segment">
              <AuthForm
                password={password}
                updatePassword={updatePassword}
                name={name}
                updateName={updateName}
                errors={errors}
                showErrors={showErrors}
                setShowErrors={setShowErrors}
              />
              <Button basic inverted color="green" style={{ width: "100%" }}>
                Register!
              </Button>
            </div>
          </form>
          <div
            className="ui horizontal divider"
            style={{ maxWidth: 360, margin: "auto", color: "#cccccc" }}
          >
            OR
          </div>
          <p style={{ textAlign: "center", marginTop: 15 }}>
            If you already have an account
          </p>
          <div
            className="ui centered link"
            style={{
              display: "block",
              margin: "auto",
              color: "#21ba45",
              cursor: "pointer"
            }}
            onClick={() => navigation.selectPage(5)}
          >
            Login
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
