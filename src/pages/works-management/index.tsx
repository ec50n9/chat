import { Button, List, Loading, PullRefresh, Tabs } from "@taroify/core";
import { View, Image } from "@tarojs/components";
import { usePageScroll } from "@tarojs/taro";
import dayjs from "dayjs";
import { useRef, useState } from "react";

type WorksItem = {
  id: string;
  title: string;
  cover?: string;
  publicTime: number;
  hot: number;
  like: number;
  comment: number;
  collect: number;
};

function WorksItemView(props: { item: WorksItem }) {
  const { item } = props;

  const viewData = [
    {
      name: "热度",
      value: item.hot,
    },
    {
      name: "点赞",
      value: item.like,
    },
    {
      name: "评论",
      value: item.comment,
    },
    {
      name: "收藏",
      value: item.collect,
    },
  ];

  return (
    <View className='m-3 p-3 bg-white rd-3'>
      <View className='flex items-center gap-3'>
        {item.cover ? (
          <Image
            className='shrink-0 w-96 h-96 rd-2 of-hidden'
            src={item.cover}
          />
        ) : (
          ""
        )}
        <View className='grow w-0 flex flex-col gap-1'>
          <View className='text-base truncate'>{item.title}</View>
          <View className='text-sm c-gray-4'>
            发布时间: {dayjs(item.publicTime).format("YYYY-MM-DD")}
          </View>
        </View>
      </View>

      <View className='mt-3 flex justify-around'>
        {viewData.map((dataItem, index) => (
          <View key={index} className='flex flex-col items-center'>
            <View className='text-base'>{dataItem.value}</View>
            <View className='text-sm c-gray-4'>{dataItem.name}</View>
          </View>
        ))}
      </View>

      <View className='mt-3 flex justify-end'>
        <View className='px-5 py-0.5 b-1 b-solid b-gray-3 c-gray-6 text-sm rd-full'>
          删除
        </View>
      </View>
    </View>
  );
}

function MyWorks() {
  const [hasMore, setHasMore] = useState(true);
  const [list, setList] = useState<WorksItem[]>([]);
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
    // 这里需要根据listId来获取不同的内容对象，传到ResultItem中，会自动按照对应的格式展示
    const newList: WorksItem[] = refreshingRef.current ? [] : list;
    setTimeout(() => {
      refreshingRef.current = false;
      // 这里推数据到数组中
      newList.push(
        {
          id: "1",
          title: "作品标题",
          cover: "https://img.yzcdn.cn/vant/cat.jpeg",
          publicTime: 1624300800000,
          hot: 100,
          like: 100,
          comment: 100,
          collect: 100,
        },
        {
          id: "2",
          title: "这是标题，默认一行",
          publicTime: Date.now(),
          hot: 100,
          like: 100,
          comment: 100,
          collect: 100,
        }
      );

      setList(newList);
      setLoading(false);
      setHasMore(newList.length < 40);
    }, 0);
  };

  const onRefresh = () => {
    refreshingRef.current = true;
    setLoading(false);
    onLoad();
  };

  return (
    <View>
      <View className='p-4 pb-0 text-xl c-gray-6'>3 篇作品</View>
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
            {list.map((item, index) => (
              <WorksItemView key={index} item={item} />
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
    </View>
  );
}

function UnderReview() {
  const [hasMore, setHasMore] = useState(true);
  const [list, setList] = useState<WorksItem[]>([]);
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
    // 这里需要根据listId来获取不同的内容对象，传到ResultItem中，会自动按照对应的格式展示
    const newList: WorksItem[] = refreshingRef.current ? [] : list;
    setTimeout(() => {
      refreshingRef.current = false;
      // 这里推数据到数组中
      newList.push(
        {
          id: "1",
          title: "作品标题",
          cover: "https://img.yzcdn.cn/vant/cat.jpeg",
          publicTime: 1624300800000,
          hot: 100,
          like: 100,
          comment: 100,
          collect: 100,
        },
        {
          id: "2",
          title: "这是标题，默认一行",
          publicTime: Date.now(),
          hot: 100,
          like: 100,
          comment: 100,
          collect: 100,
        }
      );

      setList(newList);
      setLoading(false);
      setHasMore(newList.length < 40);
    }, 0);
  };

  const onRefresh = () => {
    refreshingRef.current = true;
    setLoading(false);
    onLoad();
  };

  return (
    <View>
      <View className='p-4 pb-0 text-xl c-gray-6'>3 篇作品</View>
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
            {list.map((item, index) => (
              <WorksItemView key={index} item={item} />
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
    </View>
  );
}

function NotPass() {
  const [hasMore, setHasMore] = useState(true);
  const [list, setList] = useState<WorksItem[]>([]);
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
    // 这里需要根据listId来获取不同的内容对象，传到ResultItem中，会自动按照对应的格式展示
    const newList: WorksItem[] = refreshingRef.current ? [] : list;
    setTimeout(() => {
      refreshingRef.current = false;
      // 这里推数据到数组中
      newList.push(
        {
          id: "1",
          title: "作品标题",
          cover: "https://img.yzcdn.cn/vant/cat.jpeg",
          publicTime: 1624300800000,
          hot: 100,
          like: 100,
          comment: 100,
          collect: 100,
        },
        {
          id: "2",
          title: "这是标题，默认一行",
          publicTime: Date.now(),
          hot: 100,
          like: 100,
          comment: 100,
          collect: 100,
        }
      );

      setList(newList);
      setLoading(false);
      setHasMore(newList.length < 40);
    }, 0);
  };

  const onRefresh = () => {
    refreshingRef.current = true;
    setLoading(false);
    onLoad();
  };

  return (
    <View>
      <View className='p-4 pb-0 text-xl c-gray-6'>3 篇作品</View>
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
            {list.map((item, index) => (
              <WorksItemView key={index} item={item} />
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
    </View>
  );
}

function BasicTabs() {
  const [current, setCurrent] = useState(0);

  return (
    <Tabs value={current} onChange={setCurrent} sticky>
      <Tabs.TabPane title='我的作品'>
        <MyWorks />
      </Tabs.TabPane>
      <Tabs.TabPane title='审核中'>
        <UnderReview />
      </Tabs.TabPane>
      <Tabs.TabPane title='未通过'>
        <NotPass />
      </Tabs.TabPane>
    </Tabs>
  );
}

export default function Index() {
  return (
    <View className='bg-gray-1 c-gray-7'>
      <BasicTabs />
    </View>
  );
}
