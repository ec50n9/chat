import { ScrollView, View, Image } from "@tarojs/components";
import { useState, useEffect, useRef } from "react";
import { Share, Comment, Like, ArrowDown } from "@taroify/icons";
import Taro, { usePageScroll } from "@tarojs/taro";
import { List, Loading, PullRefresh } from "@taroify/core";

import AuthorInfo from "../components/author-info";
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

// 文章圈子列表
function PostItemCircles(props: { circles: string[] }) {
  let circles = props.circles;
  if (!circles || !circles.length) circles = ["漂流者"];
  return (
    <View className='post-item__circles'>
      {circles.map((circle) => (
        <View className='post-item__circles__item' key={circle}>
          # {circle}
        </View>
      ))}
    </View>
  );
}

// 获取文章行数
function getLineCount(text: string, count: number) {
  const lines = text.split("\n");
  let lineCount = 0;
  for (const line of lines) {
    lineCount += Math.ceil(line.length / count);
  }
  return lineCount;
}

// 文章底部操作（点赞、分享等）
function PostItemActions(props: {
  actions: { icon: JSX.Element; text: string }[];
}) {
  return (
    <View className='post-item__actions'>
      {props.actions.map((action) => (
        <View className='post-item__actions__item' key={action.text}>
          {action.icon}
          <View className='post-item__actions__item__text'>{action.text}</View>
        </View>
      ))}
    </View>
  );
}

// 文章item
function PostItem(props: Post) {
  // 文章操作相关变量
  const actions = [
    {
      icon: <Share />,
      text: "分享",
    },
    {
      icon: <Comment />,
      text: props.commentCount + "",
    },
    {
      icon: <Like />,
      text: props.likeCount + "",
    },
  ];

  // 展开/收起 相关变量
  const [expanded, setExpanded] = useState(false);
  const [lineCount] = useState(getLineCount(props.content, 20));
  const [content, setContent] = useState(props.content);
  useEffect(() => {
    if (expanded) {
      setContent(props.content);
    } else {
      setContent(props.content.slice(0, 20 * 3));
    }
  }, [expanded, props.content]);

  // 展开/收起
  const handleExpand = (e: any) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };

  // 跳转到详情页
  const gotoDetail = () => {
    Taro.navigateTo({
      url: `/pages/community-detail/index?id=${props.id}`,
    });
  };

  return (
    <View className='post-item' onClick={gotoDetail}>
      <AuthorInfo {...props.author} timestamp={props.createdAt} showFollowed />

      <View className='post-item__content'>
        {content}
        {lineCount > 3 ? (
          <>
            {expanded ? "" : "... "}
            <View className='post-item__content__expand' onClick={handleExpand}>
              {expanded ? "收起" : "展开"}
            </View>
          </>
        ) : (
          ""
        )}
      </View>

      <View className='post-item__images'>
        {props.images?.map((image, index) => (
          <Image
            className='post-item__images__item'
            src={image}
            key={image + index}
          />
        ))}
      </View>

      <PostItemActions actions={actions} />

      <PostItemCircles circles={props.author.circles} />
    </View>
  );
}

// 文章列表
function PostList(props: { posts: Post[] }) {
  return (
    <View className='post-list'>
      {props.posts.map((post) => (
        <PostItem key={post.id} {...post} />
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
