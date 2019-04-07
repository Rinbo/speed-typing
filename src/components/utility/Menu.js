import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../context/APIContext";
import { Accordion, Icon, Button } from "semantic-ui-react";
import { signOutUser } from "../actions/userActions";

export default ({ selectPage }) => {
  const [windowWidth, setWindowWidth] = useState(1000);
  const [activeIndex, setActiveIndex] = useState(0);
  const authContext = useContext(AuthContext);

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
        <Button
          inverted
          basic
          color="green"
          className="item borjessons-link"
          onClick={() => selectPage(3)}
        >
          <i className="user icon borjessons-icon" style={styles.icon} />
        </Button>
        <Button
          inverted
          basic
          color="green"
          className="item borjessons-link"
          onClick={() => {
            signOutUser(authContext.globalDispatch);
            selectPage(1);
          }}
        >
          <i className="sign-out icon borjessons-icon" style={styles.icon} />
        </Button>
      </>
    );
  };

  const renderAuthLinks = () => {
    return (
      <Button
        inverted
        basic
        color="green"
        className="item borjessons-link"
        onClick={() => selectPage(4)}
      >
        <i className="sign-in icon borjessons-icon" style={styles.icon} />
      </Button>
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
      <Button
        inverted
        basic
        color="green"
        className="item borjessons-link"
        onClick={() => selectPage(1)}
      >
        <i className="gamepad icon borjessons-icon" style={styles.icon} />
      </Button>
      <Button
        inverted
        basic
        color="green"
        className="item borjessons-link"
        onClick={() => selectPage(2)}
      >
        <i className="trophy icon borjessons-icon" style={styles.icon} />
      </Button>
      {authContext.isSignedIn ? renderUserLinks() : renderAuthLinks()}
    </div>
  );

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  return (
    <Accordion inverted as={Icon}>
      <Accordion.Title
        active={activeIndex === 0}
        index={0}
        onClick={handleClick}
      >
        <Icon
          name="bars"
          size="big"
          inverted
          style={{ position: "fixed", left: 10, top: 10 }}
        />
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 0} content={renderContent} />
    </Accordion>
  );
};
