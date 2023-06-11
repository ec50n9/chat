import { LuckyGrid } from "@lucky-canvas/taro/react";
import { useLayoutEffect, useRef } from "react";
import "./index.scss";

export default function Lucky() {
  const myLucky = useRef<any>(null);
  const state = {
    rows: 3,
    cols: 3,
    blocks: [
      { padding: "13px", background: "#617df2" },
      // { padding: "13px", background: "#b8c5f2" },
      // { padding: "13px", background: "#e9e8fe" },
    ],
    prizes: [
      { x: 0, y: 0, fonts: [{ text: "0", top: "36%" }] },
      { x: 1, y: 0, fonts: [{ text: "1", top: "36%" }] },
      { x: 2, y: 0, fonts: [{ text: "2", top: "36%" }] },
      { x: 0, y: 1, fonts: [{ text: "3", top: "36%" }] },
      { x: 2, y: 1, fonts: [{ text: "4", top: "36%" }] },
      { x: 0, y: 2, fonts: [{ text: "5", top: "36%" }] },
      { x: 1, y: 2, fonts: [{ text: "6", top: "36%" }] },
      { x: 2, y: 2, fonts: [{ text: "7", top: "36%" }] },
    ],
    buttons: [
      {
        x: 1,
        y: 1,
        radius: "40px",
        background: "#869cfa",
        pointer: true,
        fonts: [{ text: "开始", top: "32%" }],
      },
    ],
    activeStyle: {
      fontColor: "#f9bdbd",
      background: "#9c9cdd",
    },
    defaultStyle: {
      fontSize: "30px",
      fontColor: "#ff6b61",
      fontWeight: 700,
      background: "#b8c5f2",
    },
    defaultConfig: {
      speed: 1,
    },
  };

  useLayoutEffect(() => {
    console.log("useLayoutEffect", myLucky.current);
  }, []);

  const handleStart = () => {
    console.log("start");

    myLucky.current.play();
    setTimeout(() => {
      const index = Math.floor(Math.random() * 6);
      myLucky.current.stop(index);
    }, 2500);
  };
  const handleEnd = (prize: number) => {
    console.log(prize);
  };

  return (
    <LuckyGrid
      ref={myLucky}
      width="300px"
      height="300px"
      {...state}
      onStart={handleStart}
      onEnd={handleEnd}
    />
  );
}
