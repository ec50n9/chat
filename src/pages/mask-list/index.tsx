import { Avatar, List, Loading, PullRefresh } from "@taroify/core";
import { View, Text } from "@tarojs/components";
import { usePageScroll } from "@tarojs/taro";
import { useState, useRef } from "react";

function Item(props: {
  avatar: string;
  title: string;
  subTitle: string;
  count: number;
  date: Date;
}) {
  const dateStr = `${props.date.getFullYear()}-${props.date.getMonth()}-${props.date.getDate()}`;

  return (
    <View className='px-3 py-2 pb-0 flex justify-between gap-3 bg-white'>
      <Avatar
        className='shrink-0'
        src={props.avatar}
        size='medium'
        shape='rounded'
      />
      <View className='grow flex flex-col b-b-2 b-b-solid b-b-gray-3 of-hidden'>
        <View className='flex justify-between items-center'>
          <Text>{props.title}</Text>
          <Text className='text-xs c-gray-5'>{dateStr}</Text>
        </View>
        <View className='flex justify-between items-center gap-3 pt-0 pb-2 of-hidden'>
          <Text className='text-xs c-gray-5 truncate'>
            {props.subTitle.replace("\n", "")}
          </Text>
          <View className='shrink-0 min-w-36 h-36 bg-red-5 c-white text-xs rd-full center'>
            {props.count}
          </View>
        </View>
      </View>
    </View>
  );
}

export default function Index() {
  const [hasMore, setHasMore] = useState(true);
  const [list, setList] = useState<any[]>([]);
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
          id: `${num}`,
          avatar: "https://img.yzcdn.cn/vant/cat.jpeg",
          title: "Ai 小能",
          subTitle: "你好，我想了解你有什么功能你好，我想了解你有什么功能你好，我想了解你有什么功能你好，我想了解你有什么功能",
          count: (Math.random()*10).toFixed(0),
          date: new Date(),
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
    <View className='min-h-screen bg-gray-1'>
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
            <Item
              key={item.id}
              avatar={item.avatar}
              title={item.title}
              subTitle={item.subTitle}
              count={item.count}
              date={item.date}
            />
          ))}
          {!refreshingRef.current && (
            <List.Placeholder>
              {loading && <Loading>加载中...</Loading>}
              {!hasMore && "没有更多了"}
            </List.Placeholder>
          )}
        </List>
      </PullRefresh>
    </View>
  );
}
