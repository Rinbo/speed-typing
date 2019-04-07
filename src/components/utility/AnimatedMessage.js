import React, { useEffect } from "react";

export const AnimatedMessage = ({ message, status, dispatch }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({
        type: "FLASH_MESSAGE",
        payload: { message: "", status: null }
      });
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
        color: status === 200 ? "#21ba45" : "darkred",
        marginTop: 20
      }}
    >
      {message}
    </div>
  );
};

export default AnimatedMessage;
