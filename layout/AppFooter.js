import React, { useContext, useState, useEffect } from "react";
import { LayoutContext } from "./context/layoutcontext";

export default function AppFooter() {
  const { layoutConfig } = useContext(LayoutContext);

  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined
  });

  useEffect(() => {
    // Screen resize
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    if (typeof window !== "undefined") {
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return (
    <div
      className="layout-footer"
      style={{ fontSize: windowSize.width > 590 ? 17 : 12 }}
    >
      <img
        src={`/layout/images/logo-${
          layoutConfig.colorScheme === "light" ? "dark" : "white"
        }.svg`}
        alt="Logo"
        height="20"
        className="mr-2"
      />
      by
      <span className="font-medium ml-2">
        Alan Francisco M. & Diana Celeste H.
      </span>
    </div>
  );
}
