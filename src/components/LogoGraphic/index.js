import { useEffect, useRef } from "react";
import Vivus from "vivus";
import file from "./logo.svg";

import "./style.css";

export const LogoGraphic = () => {
  const svg = useRef();

  useEffect(() => {
    svg.current.replaceChildren();
    new Vivus(
      svg.current,
      {
        file,
        type: "oneByOne",
        duration: 800,
      },
      null
    );
  }, []);

  return <div id="logo-graphic" ref={svg}></div>;
};
