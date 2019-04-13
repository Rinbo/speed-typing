import React, { useState } from "react";
import UserScores from "./UserScores";
import UserProfile from "./UserProfile";
import UserStats from "./UserStats";
import { Menu, Segment } from "semantic-ui-react";

const UserContainer = () => {
  const [activeTab, setActiveTab] = useState("Your scores");

  const handleClick = (e, { name }) => {
    setActiveTab(name);
  };

  const renderTab = () => {
    switch (activeTab) {
      case "Account":
        return <UserProfile />;
      case "Your scores":
        return <UserScores />;
      case "Statistics":
        return <UserStats />;
      default:
        return null;
    }
  };

  return (
    <Segment inverted style={{ width: 375, margin: "auto" }}>
      <Menu pointing secondary inverted>
        <Menu.Item
          name="Your scores"
          active={activeTab === "Your scores"}
          onClick={handleClick}
        />
        <Menu.Item
          name="Statistics"
          active={activeTab === "Statistics"}
          onClick={handleClick}
        />
        <Menu.Item
          name="Account"
          active={activeTab === "Account"}
          onClick={handleClick}
        />
      </Menu>
      <div className="borjessons-margin">{renderTab()}</div>
    </Segment>
  );
};

export default UserContainer;
