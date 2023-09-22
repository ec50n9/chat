import {
  ArrowLeft,
  CartOutlined,
  CommentOutlined,
  LikeOutlined,
  Star,
  StarOutlined,
} from "@taroify/icons";
import { Image, Tabs } from "@taroify/core";
import { View } from "@tarojs/components";
import { getCurrentInstance } from "@tarojs/runtime";
import { usePageScroll } from "@tarojs/taro";
import { useEffect, useRef, useState } from "react";

type UserDetails = {
  id: string;
  username: string;
  nickname: string;
  signture: string;
  avatar: string;
  following: number;
  followers: number;
  isFollowed: boolean;
};

type Article = {
  id: string;
  title: string;
  cover: string;
  likeCount: number;
  author: UserDetails;
};

function ArticleItem(props: { article: Article }) {
  const article = props.article;
  return (
    <View className='flex flex-col gap-2 h-500 c-gray-7 bg-white'>
      <View className='grow object-cover rd-3 of-hidden bg-blue-3'>
        <Image
          className='w-full h-full'
          mode='aspectFill'
          src={article.author.avatar}
        />
      </View>
      <View className='shrink-0 of-hidden truncate'>{article.title}</View>
      <View className='shrink-0 flex items-center gap-1 c-gray-5'>
        <View className='shrink-0 w-40 h-40 bg-gray-5 rd-full of-hidden'>
          <Image
            className='w-full h-full'
            mode='aspectFill'
            src={article.author.avatar}
          />
        </View>
        <View className='grow'>{article.author.nickname}</View>
        <View className='shrink-0'>
          <LikeOutlined style={{ marginRight: "4px" }} />
          {article.likeCount}
        </View>
      </View>
    </View>
  );
}

function TextArticleItem(props: { article: Article }) {
  return (
    <View className='flex flex-col gap-2 h-500 c-gray-7 bg-white'>
      <View className='shrink-0 of-hidden truncate'>{props.article.title}</View>
      <View className='shrink-0 flex items-center gap-1 c-gray-5'>
        <View className='shrink-0 w-40 h-40 bg-gray-5 rd-full of-hidden'>
          <Image
            className='w-full h-full'
            mode='aspectFill'
            src={props.article.author.avatar}
          />
        </View>
        <View className='grow'>{props.article.author.nickname}</View>
        <View className='shrink-0'>
          <LikeOutlined style={{ marginRight: "4px" }} />
          {props.article.likeCount}
        </View>
      </View>
    </View>
  );
}

function PickArticleItem(props: { article: Article }) {
  return (
    <View className='flex flex-col gap-2 h-500 c-gray-7 bg-white'>
      <View className='grow object-cover rd-3 of-hidden bg-blue-3'>
        <Image
          className='w-full h-full'
          mode='aspectFill'
          src={props.article.author.avatar}
        />
      </View>
      <View className='shrink-0 of-hidden truncate'>{props.article.title}</View>
      <View className='shrink-0 flex items-center gap-1 c-gray-5'>
        <View className='shrink-0 w-40 h-40 bg-gray-5 rd-full of-hidden'>
          <Image
            className='w-full h-full'
            mode='aspectFill'
            src={props.article.author.avatar}
          />
        </View>
        <View className='grow'>{props.article.author.nickname}</View>
        <View className='shrink-0'>
          <LikeOutlined style={{ marginRight: "4px" }} />
          {props.article.likeCount}
        </View>
      </View>
    </View>
  );
}

function ArticleList(props: { articles: Article[] }) {
  return (
    <View className='grid grid-cols-2 gap-5 px-5 py-5 bg-white'>
      {props.articles.map((article) => (
        <ArticleItem article={article} key={article.id} />
      ))}
    </View>
  );
}

function TextArticleList(props: { articles: Article[] }) {
  return (
    <View className='flex flex-col gap-5 px-5 py-5 bg-white'>
      {props.articles.map((article) => (
        <TextArticleItem article={article} key={article.id} />
      ))}
    </View>
  );
}

function PickArticleList(props: { articles: Article[] }) {
  return (
    <View className='grid grid-cols-2 gap-5 px-5 py-5 bg-white'>
      {props.articles.map((article) => (
        <PickArticleItem article={article} key={article.id} />
      ))}
    </View>
  );
}

export default function Index() {
  const { router } = getCurrentInstance();
  const id = router?.params?.id;

  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  useEffect(() => {
    console.log("user details id", id);
    setUserDetails({
      id: "abc",
      username: "abc",
      nickname: "陈霸先",
      signture: "每个人都有快乐的时候，你呢？",
      avatar:
        "https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&h=1280&q=80",
      following: 97,
      followers: 634,
      isFollowed: false,
    });
  }, []);

  // 文章列表相关
  const tempArticleList = [
    {
      id: "1",
      title: "文章1",
      cover:
        "https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&h=1280&q=80",
      likeCount: 100,
      author: {
        id: "abc",
        nickname: "作者1",
        avatar:
          "https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&h=1280&q=80",
      },
    },
    {
      id: "2",
      title: "文章文章文章文章文章文章文章,文章文章文章文章",
      cover: "",
      likeCount: 100,
      author: {
        nickname: "作者1",
        avatar: "",
      },
    },
    {
      id: "3",
      title: "文章文章文章文章文章文章文章,文章文章文章文章",
      cover: "",
      likeCount: 100,
      author: {
        nickname: "作者1",
        avatar: "",
      },
    },
    {
      id: "4",
      title: "文章文章文章文章文章文章文章,文章文章文章文章",
      cover: "",
      likeCount: 100,
      author: {
        nickname: "作者1",
        avatar: "",
      },
    },
    {
      id: "5",
      title: "文章文章文章文章文章文章文章,文章文章文章文章",
      cover: "",
      likeCount: 100,
      author: {
        nickname: "作者1",
        avatar: "",
      },
    },
    {
      id: "6",
      title: "文章文章文章文章文章文章文章,文章文章文章文章",
      cover: "",
      likeCount: 100,
      author: {
        nickname: "作者1",
        avatar: "",
      },
    },
  ];

  const [articleList, setArticleList] = useState<Article[]>([]);
  const [textArticleList, setTextArticleList] = useState<Article[]>([]);
  const [pickArticleList, setPickArticleList] = useState<Article[]>([]);

  type Tab = "article" | "text" | "pick";
  const [currentTab, setCurrentTab] = useState<Tab>("article");
  useEffect(() => {
    ({
      // 加载图文列表
      article: () => !articleList.length && setArticleList(tempArticleList),
      // 加载文本列表
      text: () =>
        !textArticleList.length && setTextArticleList(tempArticleList),
      // 加载pick列表
      pick: () =>
        !pickArticleList.length && setPickArticleList(tempArticleList),
    })[currentTab]();
  }, [currentTab]);

  return (
    <View className='min-h-screen c-white text-base bg-gray-7'>
      <View className='p-3'>
        <ArrowLeft />
      </View>

      <View className='flex items-center gap-3 p-3'>
        <View className='w-96 h-96 rd-full of-hidden bg-blue-200'>
          <Image
            className='w-full h-full'
            mode='aspectFill'
            src={userDetails?.avatar}
          />
        </View>
        <View className='grow'>
          <View className='text-base'>{userDetails?.nickname}FV</View>
          <View className='text-sm c-gray-3'>账户ID：{userDetails?.id}</View>
          <View className='text-xs c-gray-3'>
            {userDetails?.signture ?? "这个人很懒，什么都没有留下"}
          </View>
        </View>
        <View className='shrink-0 w-72 h-72 flex center rd-full text-lg bg-white bg-opacity-30'>
          {userDetails?.isFollowed ? <Star /> : <StarOutlined />}
        </View>
        <View className='shrink-0 w-72 h-72 flex center rd-full text-lg bg-white bg-opacity-30'>
          <CommentOutlined />
        </View>
      </View>

      <View className='flex gap-12 items-center rd-t-8 c-gray-7 bg-white px-5 py-3'>
        <View className='shrink-0 flex flex-col items-center grow items-center'>
          <CartOutlined size={24} /> ta的小店
        </View>
        <View className='shrink-0 flex flex-col items-center'>
          <View className='font-bold'>{userDetails?.following}</View>
          <View className='text-sm px-1 bg-gray-7 bg-opacity-30'>关注</View>
        </View>
        <View className='shrink-0 flex flex-col items-center'>
          <View className='font-bold'>{userDetails?.followers}</View>
          <View className='text-sm px-1 bg-gray-7 bg-opacity-30'>粉丝</View>
        </View>
      </View>

      <Tabs value={currentTab} onChange={setCurrentTab}>
        <Tabs.TabPane value='article' title='图文'>
          <ArticleList articles={articleList} />
        </Tabs.TabPane>
        <Tabs.TabPane value='text' title='文本'>
          <TextArticleList articles={textArticleList} />
        </Tabs.TabPane>
        <Tabs.TabPane value='pick' title='Pick'>
          <PickArticleList articles={pickArticleList} />
        </Tabs.TabPane>
      </Tabs>
    </View>
  );
}
