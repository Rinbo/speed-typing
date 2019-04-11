import React, { useEffect, useState, useContext } from "react";
import APIContext from "../context/APIContext";
import { Button, Popup } from "semantic-ui-react";
import { signOutUser } from "../actions/userActions";

export default ({ selectPage }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const apiContext = useContext(APIContext);

  const styles = {
    icon: { color: "#cccccc", backgroundColor: "#1b1c1d" }
  };

  useEffect(() => {
    window.addEventListener("DOMContentLoaded", onWindowChange);
    window.addEventListener("resize", onWindowChange);
  }, []);

  const onWindowChange = () => {
    setWindowWidth(window.innerWidth);
  };

  const renderUserLinks = () => {
    return (
      <>
        <Popup
          trigger={
            <Button
              inverted
              basic
              color="green"
              className="item borjessons-link"
              onClick={() => selectPage(3)}
            >
              <i className="user icon borjessons-icon" style={styles.icon} />
            </Button>
          }
          content="Your score history"
        />
        <Popup
          trigger={
            <Button
              inverted
              basic
              color="green"
              className="item borjessons-link"
              onClick={() => {
                signOutUser(apiContext.globalDispatch);
                apiContext.setScore(null);
                selectPage(1);
              }}
            >
              <i
                className="sign-out icon borjessons-icon"
                style={styles.icon}
              />
            </Button>
          }
          content="Sign out"
        />
      </>
    );
  };

  const renderAuthLinks = () => {
    return (
      <Popup
        trigger={
          <Button
            inverted
            basic
            color="green"
            className="item borjessons-link"
            onClick={() => selectPage(4)}
          >
            <i className="sign-in icon borjessons-icon" style={styles.icon} />
          </Button>
        }
        content="Sign-in"
      />
    );
  };

  const renderContent = (
    <div
      style={{ backgroundColor: "#171717" }}
      className={
        windowWidth < 769
          ? "ui bottom fixed fluid four item inverted menu"
          : "ui vertical icon menu inverted fixed-menu"
      }
    >
      <Popup
        trigger={
          <Button
            inverted
            basic
            color="green"
            className="item borjessons-link"
            onClick={() => selectPage(1)}
          >
            <i className="code icon borjessons-icon" style={styles.icon} />
          </Button>
        }
        content="Code Speed Test"
      />
      <Popup
        trigger={
          <Button
            inverted
            basic
            color="green"
            className="item borjessons-link"
            onClick={() => selectPage(2)}
          >
            <i className="trophy icon borjessons-icon" style={styles.icon} />
          </Button>
        }
        content="Global Highscores"
      />

      {apiContext.isSignedIn ? renderUserLinks() : renderAuthLinks()}
    </div>
  );

  return renderContent;
};
