import { View } from "@tarojs/components";
import "./index.scss";
import LuckyAllImg from "./components/lucky-all-img";
import LuckySomeImg from "./components/lucky-some-img";

function Index(_props) {
  return (
    <View>
      {/* 仿抽奖乐大转盘（奖品背景为纯色，背景不动） */}
      <LuckySomeImg />
      {/* 大转盘默认demo（全部是图片，背景跟着转） */}
      {/* <LuckyAllImg /> */}
    </View>
  );
}

export default Index;
