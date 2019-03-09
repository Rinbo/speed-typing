import React, { useContext } from "react";
import Authpage from "./auth/Authpage";
import Spinner from "./utility/Spinner";
import AuthContext from "./auth/AuthContext";
import "./app.css";
import LandingPage from "./LandingPage";

export const App = () => {
  const authContext = useContext(AuthContext);
  
  const renderApp = () => {
    if (authContext.isLoading) {
      return <Spinner />;
    }
    if (!authContext.isSignedIn) {
      return <Authpage />;
    }
    return <LandingPage />;
  };

  return renderApp();
};

export default App;
