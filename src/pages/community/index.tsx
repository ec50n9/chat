import { View, Image } from "@tarojs/components";
import { useEffect, useState } from "react";
import { List, Search as TSearch, Tabs as TTabs } from "@taroify/core";
import { Share, Comment, Like, Plus, Edit } from "@taroify/icons";
import Taro from "@tarojs/taro";

import "./index.scss";
import AuthorInfo from "./components/author-info";
import { getPosts } from "./api";

// 顶部搜索框
function SearchBar() {
  const [value, setValue] = useState("");
  return (
    <TSearch
      className='search-bar'
      value={value}
      onChange={(e) => setValue(e.detail.value)}
      placeholder='请输入搜索关键词'
      shape='rounded'
    />
  );
}

type Post = {
  id: string;
  title: string;
  content: string;
  images?: string[];
  commentCount: number;
  likeCount: number;
  createdAt: number;
  author: {
    name: string;
    avatar: string;
    circles: string[];
  };
};

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

// 悬浮按钮
function FloatingButton(props: { onClick?: () => void }) {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    if (props.onClick) props.onClick();
    setShow(!show);
  };

  return (
    <View className={`floating ${!show && "floating--hidden"}`}>
      <View className='floating__bg' onClick={() => setShow(false)} />

      <View className='floating__btn floating__btn--text'>
        <Edit />
        <View className='floating__btn__desc'>发布文字</View>
      </View>

      <View className='floating__btn floating__btn--img-text'>
        <Edit />
        <View className='floating__btn__desc'>发布图文</View>
      </View>

      <View className='floating__btn floating__btn--imgs'>
        <Edit />
        <View className='floating__btn__desc'>发布图片</View>
      </View>

      <View className='floating__btn' onClick={handleClick}>
        <Plus />
      </View>
    </View>
  );
}

// 社区首页
export default function Index() {
  // 获取文章列表
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    getPosts().then((data) => {
      setPosts(data);
    });
  }, []);

  const tabs = [
    {
      title: "圈子",
      content: (
        <List>
          <SearchBar />
          <PostList posts={posts} />
        </List>
      ),
    },
    {
      title: "广场",
      content: <View>这里是广场</View>,
    },
    {
      title: "发现",
      content: <View>这里是发现</View>,
    },
  ];
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <View className='community-page'>
      <TTabs
        className='tabs'
        value={currentTab}
        onChange={setCurrentTab}
        sticky
        swipeable
      >
        {tabs.map((tab) => (
          <TTabs.TabPane
            key={tab.title}
            title={tab.title}
            className='tabs__pane'
          >
            {tab.content}
          </TTabs.TabPane>
        ))}
      </TTabs>
      <FloatingButton />
    </View>
  );
}