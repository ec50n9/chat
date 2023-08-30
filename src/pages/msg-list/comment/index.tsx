import { Avatar, List, Loading, PullRefresh } from "@taroify/core";
import { ChatOutlined, Like, LikeOutlined } from "@taroify/icons";
import { View, Text } from "@tarojs/components";
import { usePageScroll } from "@tarojs/taro";
import dayjs from "dayjs";
import { useState, useRef } from "react";

type CommentMsgItem = {
  id: string;
  avatar: string;
  nickname: string;
  timestamp: number;
  targetText: string;
  replyText: string;
  tag: string;
  liked: boolean;
};

function Item(props: { item: CommentMsgItem }) {
  const { item } = props;

  const timeStr = dayjs(item.timestamp).format("MM/DD HH:mm");

  return (
    <View className='flex gap-3 px-4 py-2'>
      <Avatar src={item.avatar} size='large' />
      <View>
        <View className='flex items-center gap-2'>
          <Text>{item.nickname}</Text>
          <Text className='rd-3 text-sm px-1 b-1 b-solid b-gray-3'>
            {item.tag}
          </Text>
        </View>

        <View className='my-1 c-gray-5 text-sm'>回复了你的评论 {timeStr}</View>

        <View>{item.replyText}</View>

        <View className='b-l-5 b-l-solid b-l-gray-3 pl-2 text-sm c-gray-5'>
          {item.targetText}
        </View>

        <View className='mt-2 flex gap-3 text-sm c-gray-5'>
          <View className='flex items-center gap-2 px-2 py-1 bg-gray-2 rd-full'>
            <ChatOutlined size={18} /> 回复评论
          </View>
          <View className='flex center px-2 bg-gray-2 rd-full'>
            {item.liked ? <Like size={18} /> : <LikeOutlined size={18} />}
          </View>
        </View>
      </View>
    </View>
  );
}

export default function Index() {
  const [hasMore, setHasMore] = useState(true);
  const [list, setList] = useState<CommentMsgItem[]>([]);
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
    const newList: CommentMsgItem[] = refreshingRef.current ? [] : list;
    setTimeout(() => {
      refreshingRef.current = false;
      for (let i = 0; i < 10; i++) {
        const num = newList.length + 1;
        newList.push({
          id: `${num}`,
          avatar: "https://img.yzcdn.cn/vant/cat.jpeg",
          nickname: `AI小助手${num}`,
          timestamp: Date.now(),
          targetText: "你拍的真好看",
          replyText: "感谢你的支持呀",
          tag: "作者",
          liked: true,
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
