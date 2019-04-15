import React, { useContext, useEffect } from "react";
import Spinner from "./utility/Spinner";
import AuthContext from "./context/APIContext";
import LandingPage from "./LandingPage";

export const App = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    console.log("Hello! For feedback - email me at robin.b@outlook.com");
  }, []);

  const renderApp = () => {
    if (authContext.isLoading) {
      return <Spinner />;
    }
    return <LandingPage />;
  };
  return renderApp();
};

export default App;
