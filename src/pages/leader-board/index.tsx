import { Avatar, ConfigProvider, Tabs } from "@taroify/core";
import { View, Text } from "@tarojs/components";
import { useState } from "react";

type Board = {
  id: string;
  name: string;
};

type RankingItem = {
  id: string;
  avatar: string;
  name: string;
  memberCount: number;
  joined: boolean;
  sort: number;
};

const sortNum2Obj = (sort: number) =>
  [
    { text: "第一", color: "#facc15", big: true },
    { text: "第二", color: "#94a3b8" },
    { text: "第三", color: "#eab308" },
  ][sort - 1];

const topSort = (a: RankingItem, b: RankingItem) => {
  const target = [2, 1, 3];
  return target[a.sort - 1] - target[b.sort - 1];
};

function TopList(props: { dataList: RankingItem[] }) {
  return (
    <View className='p-3 flex items-end gap-1'>
      {props.dataList
        .slice(0, 3)
        .sort(topSort)
        .map((item) => {
          const sortObj = sortNum2Obj(item.sort);

          return (
            <View
              key={item.id}
              className='grow w-0 p-3 flex flex-col items-center bg-white rd-2'
            >
              <Avatar
                className='b-4 b-solid'
                style={{
                  borderColor: sortObj.color,
                  transform: `scale(${sortObj.big ? 1.3 : 1})`,
                  transformOrigin: "bottom center",
                  marginTop: `${sortObj.big ? 16 : 0}px`,
                }}
                src={item.avatar}
                size='large'
              />
              <Text className='mt-2 c-gray-7 text-sm truncate'>
                {item.name}
              </Text>
              <Text
                className='mt-2 c-gray-4 text-sm'
                style={{
                  marginTop: `${sortObj.big ? 14 : 0}px`,
                  color: sortObj.color,
                  transform: `scale(${sortObj.big ? 1.4 : 1})`,
                  transformOrigin: "bottom center",
                }}
              >
                {sortObj.text}
              </Text>
            </View>
          );
        })}
    </View>
  );
}

function OthersList(props: { dataList: RankingItem[] }) {
  return (
    <View>
      {props.dataList.slice(3).map((item) => (
        <View
          key={item.id}
          className='p-3 flex items-center bg-white b-b b-b-solid b-b-gray-2'
        >
          <Text className='p-2'>{item.sort}</Text>
          <Avatar
            className='ml-3'
            src={item.avatar}
            size='large'
            shape='rounded'
          />
          <View className='ml-3 grow w-0 flex flex-col justify-between'>
            <Text className='truncate'>{item.name}</Text>
            <Text className='mt-2 c-gray-4 text-sm'>
              {item.memberCount} 人加入
            </Text>
          </View>
          {item.joined ? <Text>已加入</Text> : <Text>加入</Text>}
        </View>
      ))}
    </View>
  );
}

function RankingList(props: { listId: string }) {
  const [dataList, setDataList] = useState<RankingItem[]>([
    {
      id: "1",
      avatar: "https://img01.yzcdn.cn/vant/cat.jpeg",
      name: "广州大学校友圈",
      memberCount: 123,
      joined: true,
      sort: 1,
    },
    {
      id: "2",
      avatar: "https://img01.yzcdn.cn/vant/cat.jpeg",
      name: "广州大学校友圈",
      memberCount: 123,
      joined: true,
      sort: 2,
    },
    {
      id: "3",
      avatar: "https://img01.yzcdn.cn/vant/cat.jpeg",
      name: "广州大学校友圈",
      memberCount: 123,
      joined: true,
      sort: 3,
    },
    {
      id: "4",
      avatar: "https://img01.yzcdn.cn/vant/cat.jpeg",
      name: "广州大学校友圈",
      memberCount: 123,
      joined: true,
      sort: 4,
    },
    {
      id: "5",
      avatar: "https://img01.yzcdn.cn/vant/cat.jpeg",
      name: "广州大学校友圈",
      memberCount: 123,
      joined: true,
      sort: 5,
    },
    {
      id: "6",
      avatar: "https://img01.yzcdn.cn/vant/cat.jpeg",
      name: "广州大学校友圈",
      memberCount: 123,
      joined: true,
      sort: 6,
    },
  ]);

  return (
    <View>
      {/* 前三名 */}
      <TopList dataList={dataList} />
      {/* 其余列表 */}
      <OthersList dataList={dataList} />
    </View>
  );
}

export default function Index() {
  const boards: Board[] = [
    { id: "day", name: "日榜" },
    { id: "week", name: "周榜" },
    { id: "month", name: "月榜" },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <View className='min-h-screen bg-gray-1'>
      {/* tabbar */}
      <View className='pt-5'>
        <ConfigProvider
          theme={{
            tabsActiveColor: "#3b82f6",
            tabsCardBorderRadius: "8px",
          }}
        >
          <Tabs theme='card' value={currentIndex} onChange={setCurrentIndex}>
            {boards.map((item) => (
              <Tabs.TabPane key={item.id} title={item.name}>
                <RankingList listId={item.id} />
              </Tabs.TabPane>
            ))}
          </Tabs>
        </ConfigProvider>
      </View>
    </View>
  );
}
