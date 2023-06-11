import "./index.scss";
import { useRef, useState } from "react";
import { LuckyWheel } from "@lucky-canvas/taro/react";

function Index(_props) {
  const myLucky = useRef();

  const [blocks] = useState([{ padding: "13px", background: "#617df2" }]);
  const [prizes] = useState([
    { fonts: [{ text: "0", top: "10%" }], background: "#e9e8fe" },
    { fonts: [{ text: "1", top: "10%" }], background: "#b8c5f2" },
    { fonts: [{ text: "2", top: "10%" }], background: "#e9e8fe" },
    { fonts: [{ text: "3", top: "10%" }], background: "#b8c5f2" },
    { fonts: [{ text: "4", top: "10%" }], background: "#e9e8fe" },
    { fonts: [{ text: "5", top: "10%" }], background: "#b8c5f2" },
  ]);
  const [buttons] = useState([
    { radius: "50px", background: "#617df2" },
    { radius: "45px", background: "#afc8ff" },
    {
      radius: "40px",
      background: "#869cfa",
      pointer: true,
      fonts: [{ text: "开始\n抽奖", top: "-20px" }],
    },
  ]);

  return (
    <LuckyWheel
      ref={myLucky}
      blocks={blocks}
      prizes={prizes}
      buttons={buttons}
      onStart={() => {
        // 点击抽奖按钮会触发star回调
        // 调用抽奖组件的play方法开始游戏
        myLucky.current?.play();
        // 模拟调用接口异步抽奖
        setTimeout(() => {
          // 假设后端返回的中奖索引是0
          const index = 0;
          // 调用stop停止旋转并传递中奖索引
          myLucky.current?.stop(index);
        }, 2500);
      }}
      onEnd={(prize) => {
        // 抽奖结束会触发end回调
        console.log(prize);
      }}
    />
  );
}

export default Index;
