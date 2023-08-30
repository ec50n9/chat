import {
  DropdownMenu,
  Flex,
  Image,
  Picker,
  Popup,
  Search,
  Toast,
} from "@taroify/core";
import {
  Arrow,
  ArrowDown,
  Exchange,
  FilterOutlined,
  Plus,
} from "@taroify/icons";
import { View } from "@tarojs/components";
import { Key, useEffect, useState } from "react";

// 搜索栏
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
      <View className='h-1 bg-gray-2' />
    </>
  );
}

// 卡片
function Card(props) {
  const { children } = props;

  return <View className='bg-white m-3 p-3 rounded-3'>{children}</View>;
}

// 筛选栏
function FilterBar() {
  const [range, setRange] = useState(0);
  const [sort, setSort] = useState(0);
  const [top, setTop] = useState(false);

  return (
    <View className='flex bg-white text-sm'>
      <DropdownMenu
        className='flex-grow'
        style={{ "--dropdown-menu-box-shadow": "none" }}
      >
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
      <View
        className='flex-shrink-0 flex items-center px-5'
        style={{
          background: top ? "#999" : "#fff",
          color: top ? "#fff" : "#000",
        }}
        onClick={() => setTop(!top)}
      >
        置顶 <FilterOutlined color={top ? "#fff" : "#000"} size={18} />
      </View>
    </View>
  );
}

// 介绍框
function IntroBar() {
  return (
    <>
      <Card>
        <View className='text-lg text-center mb-3'>什么是圈子</View>
        <View>
          <View>1. 圈子是用于同圈子内部人员私密交流场。</View>
          <View>2. 可以创建如校友圈、工作圈、运动圈等。</View>
          <View>3. 也可以创建收费圈子，做个自由职业者。</View>
        </View>
      </Card>

      <Card>
        <View className='text-center'>
          参加创作者计划创建付费圈子 <Plus />
        </View>
      </Card>
    </>
  );
}

// 已加入的圈子
function JoinedCircles() {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Key[]>([]);

  const circles = [
    {
      id: "1",
      name: "广州大学校友圈",
      author: {
        id: "1",
        username: "陈霸先",
        avatar: "https://img01.yzcdn.cn/vant/cat.jpeg",
      },
    },
    {
      id: "2",
      name: "广州大学校友圈",
      author: {
        id: "1",
        username: "陈霸先",
        avatar: "https://img01.yzcdn.cn/vant/cat.jpeg",
      },
    },
  ];

  return (
    <Card>
      <Flex justify='space-between' align='center'>
        <Flex.Item className='text-lg text-center'>已加入的圈子</Flex.Item>
        <Flex.Item className='text-gray text-center'>
          所有 <Arrow />
        </Flex.Item>
      </Flex>

      <View className='mt-3 grid grid-cols-2 gap-3'>
        {circles.map((circle) => (
          <View
            key={circle.id}
            className='rounded-3 border-2 border-solid border-gray-3 overflow-hidden'
          >
            <View className='h-xl'>
              <Image
                src='https://img01.yzcdn.cn/vant/cat.jpeg'
                mode='aspectFill'
              />
            </View>
            <View className='mt-2 px-2 truncate'>{circle.name}</View>
            <View className='p-2 flex justify-between items-center text-gray text-sm'>
              <View>{circle.author.username}</View>
              <View className='w-48 h-48 rounded-full overflow-hidden'>
                <Image
                  src='https://img01.yzcdn.cn/vant/cat.jpeg'
                  mode='aspectFill'
                />
              </View>
            </View>
          </View>
        ))}
      </View>
    </Card>
  );
}

// 热门圈子项目
function HotCircles() {
  const title = "圈子热度周榜";
  const desc = "每周更新 | 查看完整榜单";
  const cover = "https://img01.yzcdn.cn/vant/cat.jpeg";
  const hotCircles = [
    {
      id: "1",
      name: "广州大学校友圈",
    },
    {
      id: "2",
      name: "广州大学校友圈",
    },
  ];

  return (
    <View className='my-3 bg-gray-1 rounded-3 overflow-hidden'>
      <View className='flex items-center bg-gray-7  pr-6 pt-3'>
        <View className='flex-grow py-2 px-3'>
          <View className='text-lg text-white'>{title}</View>
          <View className='mt-1 text-sm text-gray-3'>
            {desc} <Arrow />
          </View>
        </View>
        <View className='flex-shrink-0 w-xs h-xs rounded overflow-hidden'>
          <Image src={cover} mode='aspectFill' />
        </View>
      </View>

      <View className='flex flex-col gap-y-2 p-3'>
        {hotCircles.map((circle, index) => (
          <View key={circle.id}>
            {index + 1}. {circle.name}
          </View>
        ))}
      </View>
    </View>
  );
}

// 热门圈子卡片
function HotCirclesCard() {
  return (
    <Card>
      <Flex justify='space-between' align='center'>
        <Flex.Item className='text-lg text-center'>热门圈子</Flex.Item>
        <Flex.Item className='text-gray text-center'>查看更多</Flex.Item>
      </Flex>
      <HotCircles />
      <HotCircles />
    </Card>
  );
}

// 可能感兴趣的圈子，卡片
function InterestCirclesCard() {
  const circles = [
    {
      id: "1",
      name: "广州大学校友圈",
      cover: "https://img01.yzcdn.cn/vant/cat.jpeg",
      members: 123,
      views: 123,
    },
    {
      id: "2",
      name: "广州大学校友圈",
      cover: "https://img01.yzcdn.cn/vant/cat.jpeg",
      members: 123,
      views: 123,
    },
  ];

  return (
    <Card>
      <Flex justify='space-between' align='center'>
        <Flex.Item className='text-lg text-center'>你可能感兴趣</Flex.Item>
        <Flex.Item className='text-gray text-center'>
          换一批 <Exchange />
        </Flex.Item>
      </Flex>
      <View>
        {circles.map((circle) => (
          <View key={circle.id} className='flex gap-x-3 mt-3'>
            <View className='flex-shrink-0 w-xs h-xs'>
              <Image src={circle.cover} mode='aspectFill' />
            </View>
            <View className='flex-grow flex flex-col justify-between py-2'>
              <View className='flex justify-between items-center'>
                <View className='text-lg'>{circle.name}</View>
                <Plus size={18} />
              </View>
              <View className='text-gray-5'>
                {circle.members} 成员 · {circle.views} 浏览
              </View>
            </View>
          </View>
        ))}
      </View>
    </Card>
  );
}

export default function Index() {
  return (
    <View className='text-base'>
      <SearchBar />
      <FilterBar />
      <IntroBar />
      <JoinedCircles />
      <HotCirclesCard />
      <InterestCirclesCard />
      <View className='h-md' />
    </View>
  );
}
