import { View, Text, ScrollView, Image } from "@tarojs/components";
import { useState } from "react";
import Taro from "@tarojs/taro";
import "./index.scss";
import LuckySomeImg from "./components/lucky-some-img";
import qrcodeBg from "../../assets/images/qrcode-bg.png";
import qrcode from "../../assets/images/qrcode.png";

function TaskItem() {
  return (
    <View className='task-item'>
      <View className='task-item__left'>
        <View className='task-item__title'>新人任务V</View>
        <View className='task-item__desc'>新人任务</View>
      </View>
      <View className='task-item__btn'>去完成</View>
    </View>
  );
}

function ShareQrcodeModal(_props: {
  style: React.CSSProperties;
  onClose?: () => void;
}) {
  return (
    <View className='share-qrcode' style={_props.style}>
      <View
        className='share-qrcode__mask'
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
          backgroundColor: "rgba(0,0,0,0.8)",
        }}
        onClick={_props.onClose}
      ></View>
      <View
        className='share-qrcode__content'
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 2,
          width: "15rem",
          height: "15rem",
          color: "#fff",
          overflow: "hidden",
          backgroundImage: `url(${qrcodeBg})`,
          backgroundSize: "100% 100%",
        }}
      >
        <View
          className='share-qrcode__img'
          style={{
            position: "absolute",
            bottom: "1.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            width: "7rem",
            height: "7rem",
          }}
        >
          <Image src={qrcode} style={{ width: "100%", height: "100%" }} />
        </View>
      </View>
    </View>
  );
}

function Index(_props) {
  const [headerClassList, setHeaderClassList] = useState("header");

  const handleScroll = (e) => {
    const { scrollTop } = e.detail;

    if (scrollTop > 30 && headerClassList === "header") {
      setHeaderClassList("header header--bg");
    } else if (scrollTop < 30) {
      setHeaderClassList("header");
    }
  };

  const gotoMine = () => {
    Taro.navigateTo({
      url: "pages/activity-mine/index",
    });
  };

  const [shareQrcodeVisible, setShareQrcodeVisible] = useState(false);
  const gotoInvite = () => {
    setShareQrcodeVisible(true);
  };

  return (
    <ScrollView className='activity-lottery' scrollY onScroll={handleScroll}>
      {/* 仿抽奖乐大转盘（奖品背景为纯色，背景不动） */}
      {/* <LuckySomeImg /> */}
      {/* 大转盘默认demo（全部是图片，背景跟着转） */}
      {/* <LuckyAllImg /> */}
      <View className='lottery'>
        <View className={headerClassList}>
          <Text className='header__back'>返回</Text>
          <Text className='header__title'>助力领现金</Text>
          <Text className='header__mine' onClick={gotoMine}>
            我的
          </Text>
        </View>

        <View className='lucky-panel'>
          <LuckySomeImg />
        </View>

        <View className='activity-time'>活动时间仅剩：23:59:58</View>

        <View className='lottery-count'>剩余抽奖次数：3</View>

        <View className='share-btn' onClick={gotoInvite}>
          邀请好友得抽奖机会
        </View>

        <ShareQrcodeModal
          style={{ display: shareQrcodeVisible ? "block" : "none" }}
          onClose={() => setShareQrcodeVisible(false)}
        />
      </View>

      <View className='card'>
        <View className='card__title'>做任务赚积分</View>
        <View className='task-list'>
          <TaskItem />
          <TaskItem />
        </View>
      </View>

      <View style={{ overflow: "auto" }}></View>
    </ScrollView>
  );
}

export default Index;
