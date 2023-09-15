import { useState, useEffect } from "react";
import {
  SCREEN_SM,
  SCREEN_MD,
  SCREEN_LG,
  SHOWN_FILMS_LG,
  SHOWN_FILMS_MD,
  SHOWN_FILMS_SM,
  PLUS_TWO_FILMS,
  PLUS_THREE_FILMS,
} from "../utils/constants";

export const useResize = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [count, setCount] = useState('');

  useEffect(() => {
    const handleResize = (event) => {
      setTimeout(setWidth(event.target.innerWidth), 3000);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isScreenSm = width <= SCREEN_SM;
  const isScreenMd = width <= SCREEN_MD;
  const isScreenLg = width >= SCREEN_LG;

  function addMoreMovies() {
    isScreenLg && setCount(count + PLUS_THREE_FILMS);
    isScreenMd && setCount(count + PLUS_TWO_FILMS);
    isScreenSm && setCount(count + PLUS_TWO_FILMS);
  }

  useEffect(() => {
    isScreenLg && setCount(SHOWN_FILMS_LG);
    isScreenMd && setCount(SHOWN_FILMS_MD);
    isScreenSm && setCount(SHOWN_FILMS_SM);
  }, [isScreenSm, isScreenMd, isScreenLg]);

  return {
    isScreenLg,
    isScreenMd,
    isScreenSm,
    addMoreMovies,
    setCount,
    count,
  };
};
