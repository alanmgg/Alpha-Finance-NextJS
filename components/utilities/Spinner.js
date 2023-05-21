import React from "react";
import RingLoader from "react-spinners/RingLoader";

export default function Spinner(props) {
  return (
    <div
      className="grid"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh"
      }}
    >
      <RingLoader
        color="#3B82F6"
        loading={true}
        size={props.layout === "small" ? 150 : 250}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
