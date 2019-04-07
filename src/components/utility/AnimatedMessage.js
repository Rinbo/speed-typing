import React, { useEffect } from "react";

export const AnimatedMessage = ({ message, statusCode, statusDispatch }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      statusDispatch({ message: "", status: null });
    }, 3100);
    return () => {
      clearTimeout(timer);
    };
  });
  
  return (
    <div
      id="banner"
      className="ui centered sub header statusMessage"
      style={{
        color: statusCode === 200 ? "#21ba45" : "darkred",
        marginTop: 20
      }}
    >
      {message}
    </div>
  );
};

export default AnimatedMessage;
