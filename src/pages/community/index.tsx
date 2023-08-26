import { View } from "@tarojs/components";
import { useState } from "react";
import { Tabs as TTabs } from "@taroify/core";
import { Plus, Edit } from "@taroify/icons";
import Taro from "@tarojs/taro";

import "./index.scss";
import CircleTab from "./circles-tab";
import ExploreTab from "./explore-tab";
import SquareTab from "./square-tab";
import PickTab from "./pick-tab";

// 悬浮按钮
function FloatingButton() {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(!show);
  };

  // 跳转到发布页
  const gotoPublish = (mode: "text" | "img-text" | "img") => {
    setShow(false);
    Taro.navigateTo({
      url: `/pages/community-publish/index?mode=${mode}`,
    });
  };

  return (
    <View className={`floating ${!show && "floating--hidden"}`}>
      <View className='floating__bg' onClick={() => setShow(false)} />

      <View
        className='floating__btn floating__btn--text'
        onClick={() => gotoPublish("text")}
      >
        <Edit />
        <View className='floating__btn__desc'>发布文字</View>
      </View>

      <View
        className='floating__btn floating__btn--img-text'
        onClick={() => gotoPublish("img-text")}
      >
        <Edit />
        <View className='floating__btn__desc'>发布图文</View>
      </View>

      <View
        className='floating__btn floating__btn--imgs'
        onClick={() => gotoPublish("img")}
      >
        <Edit />
        <View className='floating__btn__desc'>发布图片</View>
      </View>

      <View className='floating__btn' onClick={handleClick}>
        <Plus />
      </View>
    </View>
  );
}

// 社区首页
export default function Index() {
  const tabs = [
    {
      title: "圈子",
      content: <CircleTab />,
    },
    {
      title: "广场",
      content: <SquareTab />,
    },
    {
      title: "发现",
      content: <ExploreTab />,
    },
    {
      title: "Pick",
      content: <PickTab />
    }
  ];
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <View className='h-full community-page'>
      <TTabs
        className='tabs'
        value={currentTab}
        onChange={setCurrentTab}
        sticky
      >
        {tabs.map((tab) => (
          <TTabs.TabPane
            key={tab.title}
            title={tab.title}
            className='tabs__pane'
          >
            {tab.content}
          </TTabs.TabPane>
        ))}
      </TTabs>
      <FloatingButton />
    </View>
  );
}
