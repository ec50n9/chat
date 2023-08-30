import { Avatar, List, Loading, PullRefresh } from "@taroify/core";
import { View } from "@tarojs/components";
import { usePageScroll } from "@tarojs/taro";
import dayjs from "dayjs";
import { useState, useRef } from "react";

type CollectMsgItem = {
  id: string;
  avatar: string;
  nickname: string;
  timestamp: number;
};

function Item(props: { item: CollectMsgItem }) {
  const { item } = props;

  const timeStr = dayjs(item.timestamp).format("MM/DD HH:mm");

  return (
    <View className="flex gap-3 items-center px-4 py-2">
      <Avatar src={item.avatar} size="large" />
      <View>
        <View>{item.nickname}</View>
        <View className="mt-1 c-gray-5 text-sm">{timeStr} | 收藏了您的作品</View>
      </View>
    </View>
  );
}

export default function Index() {
  const [hasMore, setHasMore] = useState(true);
  const [list, setList] = useState<CollectMsgItem[]>([]);
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
    const newList: CollectMsgItem[] = refreshingRef.current ? [] : list;
    setTimeout(() => {
      refreshingRef.current = false;
      for (let i = 0; i < 10; i++) {
        const num = newList.length + 1;
        newList.push({
          id: `${num}`,
          avatar: "https://img.yzcdn.cn/vant/cat.jpeg",
          nickname: `AI小助手${num}`,
          timestamp: Date.now(),
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
    <View>
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
            <Item key={item.id} item={item} />
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
