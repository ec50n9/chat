import { DropdownMenu, Picker, Popup, Search, Toast } from "@taroify/core";
import { ArrowDown, Plus } from "@taroify/icons";
import { View } from "@tarojs/components";
import { Key, useEffect, useState } from "react";
import "./index.scss";

function SearchBar() {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <>
      <Toast open={open} onClose={() => setOpen(false)}>
        取消
      </Toast>
      <Search
        value={value}
        placeholder='请输入搜索关键词'
        action
        shape='rounded'
        onChange={(e) => setValue(e.detail.value)}
        onCancel={() => setOpen(true)}
      />
    </>
  );
}

function FilterBar() {
  const [range, setRange] = useState(0);
  const [sort, setSort] = useState(0);

  return (
    <DropdownMenu>
      <DropdownMenu.Item value={range} onChange={setRange}>
        <DropdownMenu.Option value={0}>全部</DropdownMenu.Option>
        <DropdownMenu.Option value={1}>我创建的</DropdownMenu.Option>
        <DropdownMenu.Option value={2}>我加入的</DropdownMenu.Option>
      </DropdownMenu.Item>
      <DropdownMenu.Item value={sort} onChange={setSort}>
        <DropdownMenu.Option value={0}>默认排序</DropdownMenu.Option>
        <DropdownMenu.Option value={1}>时间正序</DropdownMenu.Option>
        <DropdownMenu.Option value={2}>时间倒序</DropdownMenu.Option>
      </DropdownMenu.Item>
    </DropdownMenu>
  );
}

// 介绍框
function IntroBar() {
  return (
    <>
      <View className='intro-bar card'>
        <View style={{ textAlign: "center", marginBottom: "var(--gap-xs)", fontSize: "var(--font-lg)" }}>什么是圈子</View>
        <View className='intro-bar__desc'>
          1. 圈子是用于同圈子内部人员私密交流场。
          <br />
          2. 可以创建如校友圈、工作圈、运动圈等。
          <br />
          3. 也可以创建收费圈子，做个自由职业者。
        </View>
      </View>
      <View className='card' style={{textAlign: "center"}}>
        参加创作者计划创建付费圈子 <Plus />
      </View>
    </>
  );
}

export default function Index() {
  return (
    <View className='circles-tab'>
      <SearchBar />
      <FilterBar />
      <IntroBar />
    </View>
  );
}
