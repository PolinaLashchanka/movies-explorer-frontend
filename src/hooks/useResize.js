import { useState, useEffect } from "react";
import { SCREEN_SM, SCREEN_MD, SCREEN_LG } from "../utils/constants";

export const useResize = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [count, setCount] = useState(12);

  useEffect(() => {
    const handleResize = (event) => {
      setWidth(event.target.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isScreenSm = width <= SCREEN_SM;
  const isScreenMd = width <= SCREEN_MD;
  const isScreenLg = width >= SCREEN_LG;

  function setCountForScreenWidth() {
    isScreenLg && setCount(12);
    isScreenMd && setCount(8);
    isScreenSm && setCount(5);
  }

  function addMoreMovies() {
    isScreenLg && setCount(count + 3);
    isScreenMd && setCount(count + 2);
    isScreenSm && setCount(count + 2);
  }

  useEffect(() => {
    setCountForScreenWidth();
  }, [isScreenSm, isScreenMd, isScreenLg]);

  return {
    setCountForScreenWidth,
    addMoreMovies,
    count,
  };
};
