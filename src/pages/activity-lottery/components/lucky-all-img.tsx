import { useRef, useState } from "react";
import { LuckyWheel } from "@lucky-canvas/taro/react";
import Taro from "@tarojs/taro";
import bg1 from "../../../assets/images/背景1.png";
import prizes1 from "../../../assets/images/京东卡.png";
import prizes2 from "../../../assets/images/体验金.png";
import prizes3 from "../../../assets/images/天猫卡.png";
import prizes4 from "../../../assets/images/爱奇艺.png";
import prizes5 from "../../../assets/images/红包.png";
import prizes6 from "../../../assets/images/黑金.png";
import btn1 from "../../../assets/images/指针1.png";

const prizeList = [
  {
    id: 1,
    name: "京东卡",
    img: prizes1,
  },
  {
    id: 2,
    name: "体验金",
    img: prizes2,
  },
  {
    id: 3,
    name: "天猫卡",
    img: prizes3,
  },
  {
    id: 4,
    name: "爱奇艺",
    img: prizes4,
  },
  {
    id: 5,
    name: "红包",
    img: prizes5,
  },
  {
    id: 6,
    name: "黑金",
    img: prizes6,
  },
];

function Index(_props) {
  const myLucky = useRef();

  const [blocks] = useState([
    {
      padding: "34px",
      imgs: [
        {
          src: bg1,
          width: "100%",
          // 区别1：背景动
          rotate: true,
        },
      ],
    },
  ]);
  const [prizes] = useState(
    prizeList.map((item) => ({
      id: item.id,
      name: item.name,
      // 区别2：奖品无背景
      imgs: [
        {
          src: item.img,
          width: "60%",
          top: "10%",
        },
      ],
    }))
  );
  const [buttons] = useState([
    {
      radius: "45%",
      imgs: [
        {
          src: btn1,
          width: "100%",
          top: "-110%",
        },
      ],
    },
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
        Taro.showModal({
          title: "恭喜中奖",
          content: `恭喜你获得了 ${prize.name} x1`,
          success: function (res) {
            if (res.confirm) {
              console.log("用户点击确定");
            } else if (res.cancel) {
              console.log("用户点击取消");
            }
          },
        });
      }}
    />
  );
}

export default Index;
