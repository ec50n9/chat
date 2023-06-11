import { useRef, useState } from "react";
import { LuckyWheel } from "@lucky-canvas/taro/react";
import bg1 from "../../assets/images/背景1.png";
import prizes1 from "../../assets/images/京东卡.png";
import prizes2 from "../../assets/images/体验金.png";
import prizes3 from "../../assets/images/天猫卡.png";
import prizes4 from "../../assets/images/爱奇艺.png";
import prizes5 from "../../assets/images/红包.png";
import prizes6 from "../../assets/images/黑金.png";
import btn1 from "../../assets/images/指针1.png";
import "./index.scss";

function Index(_props) {
  const myLucky = useRef();

  const [blocks] = useState([
    {
      padding: "34px",
      imgs: [
        {
          src: bg1,
          width: "100%",
          rotate: true,
        },
      ],
    },
  ]);
  const [prizes] = useState(
    [prizes1, prizes2, prizes3, prizes4, prizes5, prizes6].map((item) => ({
      imgs: [
        {
          src: item,
          width: "60%",
          top: "10%",
        },
      ],
    }))
  );
  const [buttons] = useState([
    {
      radius: '45%',
      imgs: [{
        src: btn1,
        width: '100%',
        top: '-110%'
      }]
    }
  ]);
  const [defaultConfig] = useState({
    speed: 20,
    offsetDegree: -30,
  });

  return (
    <LuckyWheel
      ref={myLucky}
      blocks={blocks}
      prizes={prizes}
      buttons={buttons}
      defaultConfig={defaultConfig}
      onStart={() => {
        // 点击抽奖按钮会触发star回调
        // 调用抽奖组件的play方法开始游戏
        myLucky.current?.play();
        // 模拟调用接口异步抽奖
        setTimeout(() => {
          // 假设后端返回的中奖索引是0
          const index = 1;
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
