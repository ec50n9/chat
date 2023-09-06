import { List, Loading, PullRefresh, Search } from "@taroify/core";
import { Image, View } from "@tarojs/components";
import { usePageScroll } from "@tarojs/taro";
import { useEffect, useRef, useState } from "react";
import { ChatOutlined } from "@taroify/icons";

function SearchBar(props: { onSearch: (keyword: string) => void }) {
  const [value, setValue] = useState("");

  return (
    <Search
      value={value}
      placeholder='请输入搜索关键词'
      action={<View onClick={() => props.onSearch(value)}>搜索</View>}
      onChange={(e) => setValue(e.detail.value)}
    />
  );
}

function TopicItem(props: {
  topic: {
    id: string;
    avatar: string;
    name: string;
    memberCount: number;
    memberName: string;
    desc: string;
    commentCount: number;
    joined: boolean;
  };
}) {
  const { topic } = props;

  const handleJoin = () => {};
  const handleLeave = () => {};

  return (
    <View className='p-3 b-b-2 b-b-solid b-b-gray-3'>
      <View className='flex gap-3'>
        <Image
          className='shrink-0 w-96 h-96 rd-2 of-hidden'
          src={topic.avatar}
          mode='aspectFill'
        />
        <View className='grow'>
          <View>{topic.name}</View>
          <View className='c-gray-4 text-sm'>
            {topic.memberCount} {topic.memberName}
          </View>
        </View>
        <View className='shrink-0'>
          {topic.joined ? (
            <View
              className='px-3 py-.5 rd-full b-2 b-solid b-gray-4 text-xs c-gray-4'
              onClick={handleLeave}
            >
              已加入
            </View>
          ) : (
            <View
              className='px-3 py-.5 rd-full b-2 b-solid b-orange-5 text-xs c-orange-5'
              onClick={handleJoin}
            >
              加入
            </View>
          )}
        </View>
      </View>

      <View className='py-2 flex gap-3'>
        <View className='truncate'>{topic.desc}</View>
        <View className='flex items-center gap-1'>
          <ChatOutlined size={20} /> {topic.commentCount}
        </View>
      </View>
    </View>
  );
}

function CircleList(props: { keyword: string }) {
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

  const onLoad = (keyword: string = "") => {
    // 这里要根据keyword来加载列表
    setLoading(true);
    const newList = refreshingRef.current ? [] : list;
    setTimeout(() => {
      refreshingRef.current = false;
      for (let i = 0; i < 10; i++) {
        const num = newList.length + 1;
        newList.push({
          id: `${num}`,
          avatar: "https://img.yzcdn.cn/vant/cat.jpeg",
          name: "Ai 小能",
          memberName: "社死人",
          commentCount: 100,
          joined: Math.random() > 0.5,
          desc: "哈哈哈，这是内容哈哈哈，这是内容哈哈哈，这是内容哈哈哈，这是内容哈哈哈，这是内容哈哈哈，这是内容哈哈哈，这是内容哈哈哈，这是内容哈哈哈，这是内容哈哈哈，这是内容哈哈哈，这是内容哈哈哈，这是内容哈哈哈，这是内容哈哈哈，这是内容哈哈哈，这是内容哈哈哈，这是内容哈哈哈，这是内容哈哈哈，这是内容",
          memberCount: (Math.random() * 10).toFixed(0),
        });
      }
      setList(newList);
      setLoading(false);
      setHasMore(newList.length < 40);
    }, 1000);
  };

  useEffect(() => {
    onLoad(props.keyword);
  }, [props.keyword]);

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
          <TopicItem key={item.id} topic={item} />
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
  const [keyword, setKeyword] = useState("");

  return (
    <View className='min-h-screen'>
      <SearchBar onSearch={setKeyword} />
      <View className='px-5 py-3 text-lg'>全部圈子</View>
      <CircleList keyword={keyword} />
    </View>
  );
}
