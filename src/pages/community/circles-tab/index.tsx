import { ScrollView, View, Image } from "@tarojs/components";
import { useState, useEffect, useRef } from "react";
import { Share, Comment, Like, ArrowDown } from "@taroify/icons";
import Taro, { usePageScroll } from "@tarojs/taro";
import { List, Loading, PullRefresh } from "@taroify/core";

import PostItem from "../components/post-item";
import { Circle, Post, getCircles, getPosts } from "../api";
import SearchBar from "../components/search-bar";
import "./index.scss";

// 顶部圈子列表
function CircleList(props: {
  circles: Circle[];
  currentId: string;
  onChange: (id: string) => void;
}) {
  return (
    <View className='circle-list-wrapper'>
      <ScrollView scrollX>
        <View className='circle-list'>
          {props.circles.map((circle) => (
            <View
              className={`circle-list__item ${
                circle.id === props.currentId ? "circle-list__item--active" : ""
              }`}
              key={circle.id}
              onClick={() => props.onChange(circle.id)}
            >
              {circle.name}
            </View>
          ))}
        </View>
      </ScrollView>
      <View className='circle-list__item circle-list__item--pin'>
        <ArrowDown />
        {/* <Plus color='#e76038' style={{ marginRight: ".2rem" }} /> */}
      </View>
    </View>
  );
}

// 文章列表
function PostList(props: { posts: Post[] }) {
  return (
    <View className='post-list'>
      {props.posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </View>
  );
}

function Index() {
  // 获取圈子列表
  const [circles, setCircles] = useState<Circle[]>([]);
  const [currentCircleId, setCurrentCircleId] = useState("");
  useEffect(() => {
    getCircles().then((data) => {
      setCircles(data);
      setCurrentCircleId(data[0].id);
    });
  }, []);

  // 获取文章列表
  const refreshingRef = useRef(false);
  const [reachTop, setReachTop] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
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

  useEffect(() => {
    getPosts().then((data) => {
      setPosts(data);
    });
  }, []);

  return (
    <View className='circles-tab'>
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
          <CircleList
            circles={circles}
            currentId={currentCircleId}
            onChange={setCurrentCircleId}
          />
          <PostList posts={posts} />
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
