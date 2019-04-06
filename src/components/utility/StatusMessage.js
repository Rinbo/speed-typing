import React, { useContext, useState, useEffect } from "react";
import APIContext from "../context/APIContext";
import AnimatedMessage from "./AnimatedMessage";

const StatusMessage = () => {
  /* const apiContext = useContext(APIContext);
  const [showMessage, updateShowMessage] = useState("");

  useEffect(() => {
    updateShowMessage(apiContext.statusMessage);
  });

  if (showMessage === "") {
    return null;
  }
  return (
    <AnimatedMessage
      message={apiContext.statusMessage}
      statusCode={apiContext.statusCode}
      setStatus={apiContext.setStatus}
    />
  ); */
  return null;
};

export default StatusMessage;
