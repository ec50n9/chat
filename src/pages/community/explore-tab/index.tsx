import { View, ScrollView, Image } from "@tarojs/components";
import { useEffect, useState } from "react";
import { LikeOutlined } from "@taroify/icons";
import "@taroify/icons/index.scss";
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
          <LikeOutlined style={{marginRight: '4px'}} />
          {article.likeCount}
        </View>
      </View>
    </View>
  );
}

function ArticleList(props: { articles: Article[] }) {
  return (
    <ScrollView className='scroll-view' scrollY>
      <View className='article-list'>
        {props.articles.map((article) => (
          <ArticleItem article={article} key={article.id} />
        ))}
      </View>
    </ScrollView>
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
        title:
          "文章文章文章文章文章文章文章,文章文章文章文章",
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
        title:
          "文章文章文章文章文章文章文章,文章文章文章文章",
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
        title:
          "文章文章文章文章文章文章文章,文章文章文章文章",
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
        title:
          "文章文章文章文章文章文章文章,文章文章文章文章",
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
        title:
          "文章文章文章文章文章文章文章,文章文章文章文章",
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

  return (
    <View className='explore-tab'>
      <ArticleList articles={articles} />
    </View>
  );
}

export default Index;
