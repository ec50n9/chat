import { Avatar, Badge, List, Loading, PullRefresh } from "@taroify/core";
import {
  Chat,
  ChatOutlined,
  DeleteOutlined,
  SmileOutlined,
  StarOutlined,
} from "@taroify/icons";
import { Text, View } from "@tarojs/components";
import { usePageScroll } from "@tarojs/taro";
import { useState, useRef } from "react";

type MsgItem = {
  id: string;
  avatar: string;
  name: string;
  timestamp: number;
  firstMsg: string;
};

function timestamp2Str(timestamp: number) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month}-${day}`;
}

function MsgItem(props: { item: MsgItem; isNotify?: boolean }) {
  const { item } = props;

  const timeStr = timestamp2Str(item.timestamp);

  function handleClick() {
    console.log("handleClick", item.id);
  }

  return (
    <View className='flex gap-3 py-2' onClick={handleClick}>
      {props.isNotify === true ? (
        <Avatar
          className='shrink-0'
          style={{ background: "black" }}
          size='large'
        >
          <Chat size={24} />
        </Avatar>
      ) : (
        <Avatar className='shrink-0' src={item.avatar} size='large' />
      )}
      <View className='grow flex flex-col justify-between of-hidden py-1'>
        <View className='flex justify-between items-center'>
          <View>{item.name}</View>
          <View className='text-sm c-gray-5'>{timeStr}</View>
        </View>
        <View className='text-sm c-gray-5 truncate'>{item.firstMsg}</View>
      </View>
    </View>
  );
}

function MsgList() {
  const [hasMore, setHasMore] = useState(true);
  const [list, setList] = useState<MsgItem[]>([]);
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
    const newList: MsgItem[] = refreshingRef.current ? [] : list;
    setTimeout(() => {
      refreshingRef.current = false;
      for (let i = 0; i < 10; i++) {
        const num = newList.length + 1;
        newList.push({
          id: `${num}`,
          avatar: "https://img.yzcdn.cn/vant/cat.jpeg",
          name: `AI小助手${num}`,
          timestamp: Date.now(),
          firstMsg:
            "这是一段描述常常这是一段描述常常这是一段描述常常这是一段描述常常这是一段描述常常这是一段描述常常这是一段描述常常这是一段描述常常这是一段描述常常这是一段描述常常",
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
        <MsgItem
          item={{
            id: "0",
            avatar: "",
            name: "通知",
            timestamp: Date.now(),
            firstMsg: "这是一条通知",
          }}
          isNotify
        />
        {list.map((item) => (
          <MsgItem key={item.id} item={item} />
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
  // 清空消息
  function cleanMsg() {}

  const actions = [
    {
      icon: <ChatOutlined size={32} />,
      text: "评论和@",
      badge: 5,
      onClick: () => {},
    },
    {
      icon: <SmileOutlined size={32} />,
      text: "新增粉丝",
      badge: 0,
      onClick: () => {},
    },
    {
      icon: <StarOutlined size={32} />,
      text: "收藏和点赞",
      badge: 10,
      onClick: () => {},
    },
  ];

  return (
    <View className='min-h-full bg-gray-1'>
      <View className='flex justify-between items-center p-4'>
        <Text className='text-2xl'>消息通知</Text>
        <DeleteOutlined size={24} onClick={cleanMsg} />
      </View>

      <View className='flex justify-around py-3'>
        {actions.map((action, index) => (
          <View
            key={index}
            className='flex flex-col items-center gap-1'
            onClick={action.onClick}
          >
            {action.badge ? (
              <Badge content={action.badge}>{action.icon}</Badge>
            ) : (
              <>{action.icon}</>
            )}
            <Text className='text-sm'>{action.text}</Text>
          </View>
        ))}
      </View>

      <View className='pt-2 px-4'>
        <View className='pb-2'>全部私信</View>
        <MsgList />
      </View>
    </View>
  );
}
