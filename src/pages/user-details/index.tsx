import { Flex } from "@taroify/core";
import {
  ArrowLeft,
  CartOutlined,
  CommentOutlined,
  LikeOutlined,
  Star,
  StarOutlined,
} from "@taroify/icons";
import { View, Image } from "@tarojs/components";
import { getCurrentInstance } from "@tarojs/runtime";
import { usePageScroll } from "@tarojs/taro";
import { useEffect, useRef, useState } from "react";
import { Article } from "/src/pages/community/api";
import "./index.scss";

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
    <View className='article-item'>
      <View className='article-item__cover' />
      <View className='article-item__title'>{article.title}</View>
      <View className='article-item__info'>
        <View className='article-item__info__avatar'>
          <Image src={article.author.avatar} />
        </View>
        <View className='article-item__info__author'>
          {article.author.nickname}
        </View>
        <View className='article-item__info__like'>
          <LikeOutlined style={{ marginRight: "4px" }} />
          {article.likeCount}
        </View>
      </View>
    </View>
  );
}

function ArticleList(props: { articles: Article[] }) {
  return (
    <View className='article-list'>
      {props.articles.map((article) => (
        <ArticleItem article={article} key={article.id} />
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
      avatar: "abc",
      following: 97,
      followers: 634,
      isFollowed: false,
    });
    setarticleList([
      {
        id: "1",
        title: "文章1",
        cover: "",
        likeCount: 100,
        author: {
          nickname: "作者1",
          avatar: "",
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
    ]);
  }, []);

  const pageSize = 20;
  const [articleList, setarticleList] = useState<Article[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const refreshingRef = useRef(false);
  const [scrollTop, setScrollTop] = useState(0);
  const [reachTop, setReachTop] = useState(true);
  const [pageNo, setPageNo] = useState<number>(1);

  usePageScroll(({ scrollTop: aScrollTop }) => {
    setScrollTop(aScrollTop);
    setReachTop(aScrollTop === 0);
  });

  function onLoad(pageNo: number) {
    console.log(`推荐内容-on load, pageNo:${pageNo}`);
  }

  function onRefresh() {
    console.log("推荐内容-on refresh");
    refreshingRef.current = true;
    setLoading(false);
    onLoad(pageNo);
  }

  return (
    <View className='user-details'>
      <View className='header'>
        <ArrowLeft />
      </View>

      <View className='user-info'>
        <View className='user-info__avatar'></View>
        <View className='user-info__center'>
          <View className='user-info__name'>{userDetails?.nickname}FV</View>
          <View className='user-info__id'>账户ID：{userDetails?.id}</View>
          <View className='user-info__signture'>
            {userDetails?.signture ?? "这个人很懒，什么都没有留下"}
          </View>
        </View>
        <View className='user-info__follow'>
          {userDetails?.isFollowed ? <Star /> : <StarOutlined />}
        </View>
        <View className='user-info__contact'>
          <CommentOutlined />
        </View>
      </View>

      <View className='user-statistics'>
        <View className='user-statistics__item user-statistics__item--shop'>
          <CartOutlined /> ta的小店
        </View>
        <View className='user-statistics__item'>
          <View className='user-statistics__item__value'>
            {userDetails?.following}
          </View>
          <View className='user-statistics__item__label'>关注</View>
        </View>
        <View className='user-statistics__item'>
          <View className='user-statistics__item__value'>
            {userDetails?.followers}
          </View>
          <View className='user-statistics__item__label'>粉丝</View>
        </View>
      </View>

      <ArticleList articles={articleList} />
    </View>
  );
}
