import { List, Loading, PullRefresh, Search } from "@taroify/core";
import { Image, Text, View } from "@tarojs/components";
import { usePageScroll } from "@tarojs/taro";
import { useEffect, useRef, useState } from "react";
import { Ellipsis } from "../../components/ellipsis";

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

function CircleItem(props: {
  circle: {
    id: string;
    avatar: string;
    name: string;
    fullName: string;
    joined: boolean;
    ipLocation: string;
    content: string;
    memberCount: number;
    tags: string[];
  };
}) {
  const { circle } = props;

  const handleJoin = () => {};
  const handleLeave = () => {};

  return (
    <View className='p-3 b-b-2 b-b-solid b-b-gray-3'>
      <View className='flex gap-3'>
        <Image
          className='shrink-0 w-128 h-128 rd-2 of-hidden'
          src={circle.avatar}
          mode='aspectFill'
        />
        <View className='grow'>
          <View>{circle.name}</View>
          <View className='c-gray-4 text-sm'>{circle.fullName}</View>
          <View className='c-gray-4 text-sm'>IP 属地: {circle.ipLocation}</View>
        </View>
        <View className='shrink-0'>
          {circle.joined ? (
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

      <View className='py-2'>
        <Ellipsis content={circle.content} name={`circle-item-${circle.id}`}/>
      </View>

      <View className='flex justify-between text-sm c-gray-4'>
        <Text>{circle.memberCount}人加入</Text>
        <Text>{circle.tags.map((i) => `#${i}`).join(" ")}</Text>
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
          fullName: `吃了头炮（烟花爆竹）之后，`,
          joined: Math.random() > 0.5,
          ipLocation: "中国",
          content: "哈哈哈，这是内容哈哈哈，这是内容哈哈哈，这是内容哈哈哈，这是内容哈哈哈，这是内容哈哈哈，这是内容哈哈哈，这是内容哈哈哈，这是内容哈哈哈，这是内容哈哈哈，这是内容哈哈哈，这是内容哈哈哈，这是内容哈哈哈，这是内容哈哈哈，这是内容哈哈哈，这是内容哈哈哈，这是内容哈哈哈，这是内容哈哈哈，这是内容",
          memberCount: (Math.random() * 10).toFixed(0),
          tags: ["标签1", "标签2", "标签3", "标签4"],
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
          <CircleItem key={item.id} circle={item} />
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
      <View className="px-5 py-3 text-lg">全部圈子</View>
      <CircleList keyword={keyword} />
    </View>
  );
}
