import React, { useContext, useEffect, useState } from "react";
import APIContext from "../context/APIContext";

const StatusMessage = () => {
  const apiContext = useContext(APIContext);

  const renderBanner = () => {
    return (
      <div
        id="banner"
        className="ui centered sub header statusMessage"
        style={{
          color: apiContext.statusCode === 200 ? "green" : "red",
          marginTop: 20
        }}
      >
        {apiContext.statusMessage}
      </div>
    );
  };
  return renderBanner();
};

export default StatusMessage;
