import { ScrollView, View } from "@tarojs/components";
import { useEffect, useRef, useState } from "react";
import { PullRefresh, List, Loading } from "@taroify/core";
import { usePageScroll } from "@tarojs/taro";
import { Circle } from "../api";
import SearchBar from "../components/search-bar";
import "./index.scss";

function CircleItem(props: { circle: Circle }) {
  return (
    <View className='circle-item'>
      <View className='circle-item__cover'></View>
      <View className='circle-item__info'>
        <View className='circle-item__top'>
          <View className='circle-item__name'>{props.circle.name}</View>
          <View className='circle-item__follow'>关注</View>
        </View>
        <View className='circle-item__actions'>
          <View className='circle-item__actions__member'>123 加入</View>
          <View className='circle-item__actions__read'>123 阅读</View>
        </View>
      </View>
    </View>
  );
}

function CircleList(props: { circles: Circle[] }) {
  return (
    <View className='circle-list'>
      {props.circles.map((circle) => (
        <CircleItem circle={circle} key={circle.id} />
      ))}
    </View>
  );
}

function Index() {
  const [circles, setCircles] = useState<Circle[]>([]);
  useEffect(() => {
    setCircles([
      {
        id: "1",
        name: "圈子1",
      },
      {
        id: "2",
        name: "圈子2",
      },
    ]);
  }, []);

  const pageSize = 20;
  const refreshingRef = useRef(false);
  const [reachTop, setReachTop] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [scrollTop, setScrollTop] = useState(0);
  const [pageNo, setPageNo] = useState(1);

  usePageScroll(({ scrollTop: aScrollTop }) => {
    setScrollTop(aScrollTop);
    setReachTop(aScrollTop === 0);
  });

  const onLoad = (page: number) =>
    new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });

  const onRefresh = (page: number) => {
    refreshingRef.current = true;
    setLoading(true);
    onLoad(page).then(() => {
      refreshingRef.current = false;
      setLoading(false);
    });
  };

  return (
    <View className='square-tab'>
      <PullRefresh
        className='scroll-view'
        loading={refreshingRef.current}
        reachTop={reachTop}
        onRefresh={() => onRefresh(1)}
      >
        <List
          loading={loading}
          hasMore={hasMore}
          scrollTop={scrollTop}
          offset={10}
          onLoad={() => onLoad(pageNo)}
        >
          <SearchBar />
          <CircleList circles={circles} />
          {!refreshingRef.current && (
            <List.Placeholder>
              {loading && <Loading>加载中...</Loading>}
              {/* {!hasMore && <ListBottomDivider/>} */}
            </List.Placeholder>
          )}
        </List>
      </PullRefresh>
    </View>
  );
}

export default Index;
