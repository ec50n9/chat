import { Tabs } from "@taroify/core";
import Taro from "@tarojs/taro";
import { useState } from "react";

export default function ShopTab() {
  const tabs = [
    {
      name: "全部",
      tag: "all",
    },
    {
      name: "新发布",
      tag: "new",
    },
    {
      name: "新回复",
      tag: "reply",
    },
    {
      name: "等我回答",
      tag: "answer",
    },
  ];
  const [currentTab, setCurrentTab] = useState(0);

  const handleChange = (index: number) => {
    setCurrentTab(index);
    Taro.pageScrollTo({
      scrollTop: 0,
      duration: 300,
    });
  };

  return (
    <Tabs value={currentTab} onChange={handleChange} lazyRender sticky>
      {tabs.map((tab, index) => (
        <Tabs.TabPane key={index} title={tab.name}>
          {/* <JoinedCircleList listId={tab.tag} /> */}
        </Tabs.TabPane>
      ))}
    </Tabs>
  );
}
