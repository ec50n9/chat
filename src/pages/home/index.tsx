import { useRef, useState } from "react";
import { Avatar, Cell, List, Loading, PullRefresh, Tabs } from "@taroify/core";
import { View } from "@tarojs/components";
import { ChatOutlined, Friends } from "@taroify/icons";
import { usePageScroll } from "@tarojs/taro";

// 头部广告
function CommonHeader() {
  // 分享
  function share() {}

  return (
    <View className='flex gap-4 items-center bg-white m-3 mb-0 p-3 rd-4'>
      <Friends className='shrink-0 p-1 b b-solid b-gray rd-full' size={24} />
      <View className='grow c-blue-5 text-sm'>分享给朋友赚现金红包！！！</View>
      <View
        className='shrink-0 px-4 py-1 text-sm c-blue-7 bg-blue-1 rd-2'
        onClick={share}
      >
        分享
      </View>
    </View>
  );
}

type AiItem = {
  id: string;
  icon: string;
  name: string;
  statistics: number;
  desc: string;
};

function ListItem(props: { item: AiItem }) {
  const { item } = props;

  // 列表项点击事件
  function gotoDetail() {
    console.log("gotoDetail");
  }

  return (
    <View className='flex gap-3 bg-white m-3 p-3 rd-4' onClick={gotoDetail}>
      <Avatar src={item.icon} size='medium' />
      <View className='flex flex-col gap-.5'>
        <View>{item.name}</View>
        <View className='text-sm c-gray-5'>
          <ChatOutlined /> {item.statistics}
        </View>
        <View className='text-sm c-gray-5'>{item.desc}</View>
      </View>
    </View>
  );
}

function CommonList(props: { listId: string }) {
  const { listId } = props;

  const [hasMore, setHasMore] = useState(true);
  const [list, setList] = useState<AiItem[]>([]);
  const [loading, setLoading] = useState(false);
  const refreshingRef = useRef(false);
  const [scrollTop, setScrollTop] = useState(0);
  const [reachTop, setReachTop] = useState(true);

  usePageScroll(({ scrollTop: aScrollTop }) => {
    setScrollTop(aScrollTop);
    setReachTop(aScrollTop === 0);
  });

  const onLoad = () => {
    setLoading(true);
    const newList = refreshingRef.current ? [] : list;
    setTimeout(() => {
      refreshingRef.current = false;
      for (let i = 0; i < 10; i++) {
        const num = newList.length + 1;
        newList.push({
          id: `${listId}-${num}`,
          icon: "https://img.yzcdn.cn/vant/cat.jpeg",
          name: `AI小助手${listId}-${num}`,
          statistics: 1000 + num,
          desc: "这是一段描述",
        });
      }
      setList(newList);
      setLoading(false);
      setHasMore(newList.length < 40);
    }, 1000);
  };

  function onRefresh() {
    refreshingRef.current = true;
    setLoading(false);
    onLoad();
  }

  return (
    <PullRefresh
      loading={refreshingRef.current}
      reachTop={reachTop}
      onRefresh={onRefresh}
    >
      <List
        loading={loading}
        hasMore={hasMore}
        scrollTop={scrollTop}
        onLoad={onLoad}
      >
        {list.map((item) => (
          <ListItem key={item.id} item={item} />
        ))}
        {!refreshingRef.current && (
          <List.Placeholder>
            {loading && <Loading>加载中...</Loading>}
            {!hasMore && "没有更多了"}
          </List.Placeholder>
        )}
      </List>
    </PullRefresh>
  );
}

export default function Index() {
  const [value, setValue] = useState(0);

  const tabs = [
    {
      id: "recommend",
      title: "推荐",
    },
    {
      id: "tool",
      title: "工具",
    },
    {
      id: "emotion",
      title: "情感",
    },
  ];

  return (
    <Tabs
      className='min-h-screen bg-gray-1'
      sticky
      value={value}
      onChange={setValue}
    >
      {tabs.map((tab) => (
        <Tabs.TabPane key={tab.id} title={tab.title}>
          <CommonHeader />
          <CommonList listId={tab.id} />
        </Tabs.TabPane>
      ))}
    </Tabs>
  );
}
