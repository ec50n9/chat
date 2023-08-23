import { View, ScrollView, Image } from "@tarojs/components";
import { useEffect, useRef, useState } from "react";
import { LikeOutlined } from "@taroify/icons";
import { usePageScroll } from "@tarojs/taro";
import { PullRefresh, List, Loading } from "@taroify/core";
import "@taroify/icons/index.scss";
import SearchBar from "../components/search-bar";
import { Article } from "../api";

function ArticleItem(props: { article: Article }) {
  const article = props.article;
  return (
    <View className='flex flex-col gap-3 h-[500px] p-3 bg-white rd-3 of-hidden'>
      <View className='grow rd-2 of-hidden bg-blue-2'></View>
      <View className='shrink-0'>{article.title}</View>
      <View className='shrink-0 flex items-center gap-2 c-gray-7 text-sm'>
        <View className='shrink-0 w-40 h-40 bg-gray-7 rd-3'>
          <Image className='w-full h-full' src={article.author.avatar} />
        </View>
        <View className='grow'>{article.author.name}</View>
        <View className='shrink-0'>
          <LikeOutlined className='mr-1' />
          {article.likeCount}
        </View>
      </View>
    </View>
  );
}

function ArticleList(props: { articles: Article[] }) {
  return (
    <View className='grid grid-cols-2 gap-3 px-3 pb-3'>
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
    <View className='flex flex-col h-full'>
      <PullRefresh
        className='grow'
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
