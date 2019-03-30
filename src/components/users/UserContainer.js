import React, { useState } from "react";
import UserScores from "./UserScores";
import UserProfile from "./UserProfile";
import { Menu, Segment } from "semantic-ui-react";

const UserContainer = () => {
  const [activeTab, setActiveTab] = useState("Your scores");

  const handleClick = (e, { name }) => {
    setActiveTab(name);
  };

  return (
    <Segment inverted style={{ width: 450, margin: "auto" }}>
      <Menu
        attached="top"
        pointing
        secondary
        inverted
      >
        <Menu.Item
          name="Your scores"
          active={activeTab === "Your scores"}
          onClick={handleClick}
        />
        <Menu.Item
          name="Profile"
          active={activeTab === "Profile"}
          onClick={handleClick}
        />
      </Menu>
      <div inverted attached="bottom" className="borjessons-margin">
        {activeTab === "Profile" ? <UserProfile /> : <UserScores />}
      </div>
    </Segment>
  );
};

export default UserContainer;
