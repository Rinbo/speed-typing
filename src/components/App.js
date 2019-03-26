import React, { useContext } from "react";
import Spinner from "./utility/Spinner";
import AuthContext from "./context/APIContext";
import LandingPage from "./LandingPage";

export const App = () => {
  const authContext = useContext(AuthContext);

  const renderApp = () => {
    if (authContext.isLoading) {
      return <Spinner />;
    }
    return <LandingPage />;
  };

  return renderApp();
};

export default App;
