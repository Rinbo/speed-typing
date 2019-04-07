import React, { useContext, useState, useEffect } from "react";
import APIContext from "../context/APIContext";
import AnimatedMessage from "./AnimatedMessage";

const StatusMessage = () => {
  const apiContext = useContext(APIContext);
  const [showMessage, updateShowMessage] = useState("");

  useEffect(() => {
    updateShowMessage(apiContext.message);
  });

  if (showMessage === "") {
    return null;
  }
  return (
    <AnimatedMessage
      message={apiContext.message}
      status={apiContext.status}
      dispatch={apiContext.globalDispatch}
    />
  );
};

export default StatusMessage;
