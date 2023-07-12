import { View, ScrollView, Image } from "@tarojs/components";
import { useEffect, useRef, useState } from "react";
import { LikeOutlined } from "@taroify/icons";
import { usePageScroll } from "@tarojs/taro";
import { PullRefresh, List, Loading } from "@taroify/core";
import "@taroify/icons/index.scss";
import SearchBar from "../components/search-bar";
import { Article } from "../api";
import "./index.scss";

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
          {article.author.name}
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

function Index() {
  const [articles, setArticles] = useState<Article[]>([]);
  useEffect(() => {
    setArticles([
      {
        id: "1",
        title: "文章1",
        cover: "",
        likeCount: 100,
        author: {
          name: "作者1",
          avatar: "",
          circles: [],
        },
      },
      {
        id: "2",
        title: "文章文章文章文章文章文章文章,文章文章文章文章",
        cover: "",
        likeCount: 100,
        author: {
          name: "作者1",
          avatar: "",
          circles: [],
        },
      },
      {
        id: "3",
        title: "文章文章文章文章文章文章文章,文章文章文章文章",
        cover: "",
        likeCount: 100,
        author: {
          name: "作者1",
          avatar: "",
          circles: [],
        },
      },
      {
        id: "4",
        title: "文章文章文章文章文章文章文章,文章文章文章文章",
        cover: "",
        likeCount: 100,
        author: {
          name: "作者1",
          avatar: "",
          circles: [],
        },
      },
      {
        id: "5",
        title: "文章文章文章文章文章文章文章,文章文章文章文章",
        cover: "",
        likeCount: 100,
        author: {
          name: "作者1",
          avatar: "",
          circles: [],
        },
      },
      {
        id: "6",
        title: "文章文章文章文章文章文章文章,文章文章文章文章",
        cover: "",
        likeCount: 100,
        author: {
          name: "作者1",
          avatar: "",
          circles: [],
        },
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
    <View className='explore-tab'>
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
          <ArticleList articles={articles} />
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
