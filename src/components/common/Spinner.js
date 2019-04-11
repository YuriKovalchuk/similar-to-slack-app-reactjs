import React from "react";
import spinner from "./spinner.gif";

export default () => {
  return (
    <div>
      <img
        src={spinner}
        style={{
          width: "30%",
          margin: "auto",
          display: "block",
          maxWidth: "300px"
        }}
        alt="Loading..."
      />
    </div>
  );
};
