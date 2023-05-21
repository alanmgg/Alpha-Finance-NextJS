import React from "react";
import MoonLoader from "react-spinners/MoonLoader";

export default function Spinner(props) {
  return (
    <div
      className="grid"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: props.layout === "small" ? "20vh" : "50vh"
      }}
    >
      <MoonLoader
        color="#3B82F6"
        loading={true}
        size={props.layout === "small" ? 100 : 150}
        aria-label="Loading Spinner"
        data-testid="loader"
        speedMultiplier={1}
      />
    </div>
  );
}
