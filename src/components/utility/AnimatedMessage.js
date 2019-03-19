import React, { useEffect } from "react";

export const AnimatedMessage = ({ message, statusCode, setStatus }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus("", null);
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
        color: statusCode === 200 ? "darkgreen" : "darkred",
        marginTop: 20
      }}
    >
      {message}
    </div>
  );
};

export default AnimatedMessage;
