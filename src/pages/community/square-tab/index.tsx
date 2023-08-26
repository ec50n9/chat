import { View } from "@tarojs/components";
import { useEffect, useRef, useState } from "react";
import { PullRefresh, List, Loading, Swiper, Avatar } from "@taroify/core";
import { usePageScroll } from "@tarojs/taro";
import SearchBar from "../components/search-bar";
import PostItem from "../components/post-item";
import CircleItem from "../components/circle-item";
import { Arrow } from "@taroify/icons";

type TopicItem = {
  id: string;
  sort: number;
  name: string;
  commentCount: number;
  readCount: number;
  avatars: string[];
};

function HotTopicItem(props: { item: TopicItem }) {
  const { item } = props;
  return (
    <View className='flex items-center gap-3 py-2 px-4 bg-orange-100'>
      <View className='shrink-0'>{item.sort}</View>
      <Avatar
        className='shrink-0'
        src='https://joeschmoe.io/api/v1/random'
        shape='rounded'
        size="medium"
      />
      <View className='grow'>
        <View>{item.name}</View>
        <View className='mt-1 flex justify-between text-sm c-gray-5'>
          <Avatar.Group>
            {item.avatars.map((avatar) => (
              <Avatar size='mini' src={avatar} />
            ))}
          </Avatar.Group>
          <View>{item.commentCount}讨论</View>
          <View>{item.readCount}阅读</View>
        </View>
      </View>
    </View>
  );
}

function HotTopicList(props: {
  title: string;
  moreText: string;
  onMore?: () => void;
  items: TopicItem[];
}) {
  return (
    <View className='pt-0 pb-3 px-3'>
      <View className='flex justify-between pl-2'>
        <View className="text-lg">{props.title}</View>
        <View
          className='flex items-center gap-1 text-sm c-gray-5'
          onClick={props.onMore}
        >
          {props.moreText} <Arrow size={16} />
        </View>
      </View>

      <Swiper className="mt-1" loop={false} width={300}>
        {/* 将items分割成两个一组，每组生成一个SwipeItem */}
        {props.items.reduce((acc, cur, idx) => {
          if (idx % 2 === 0) {
            acc.push(
              <Swiper.Item key={idx}>
                <View className='mr-5 rd-3 of-hidden'>
                  <HotTopicItem item={cur} />
                  {props.items[idx + 1] && (
                    <HotTopicItem item={props.items[idx + 1]} />
                  )}
                </View>
              </Swiper.Item>
            );
          }
          return acc;
        }, [] as any[])}
      </Swiper>
    </View>
  );
}

function MixedList(props: { circles: any[] }) {
  const item2Jsx = (item: any, key: any) => {
    return {
      circle: <CircleItem circle={item} key={key} />,
      post: <PostItem post={item} key={key} />,
    }[item.type];
  };

  return (
    <View className='flex flex-col gap-3 px-3 pb-3'>
      {props.circles.map((circle) => item2Jsx(circle, circle.id))}
    </View>
  );
}

function Index() {
  const [items, setItems] = useState<any[]>([]);
  useEffect(() => {
    setItems([
      {
        type: "post",
        id: "3",
        title: "标题",
        content: `Lorem ipsum是指一篇用于网页设计、排印、布局和印刷的伪拉丁文章，其用于代替英语去强调设计元素而不是内容。它也被称为占位符文（或填充文）。它是一个很便利的模板工具。它用于帮助编排文章或演示文稿的视觉元素，如排印，字体，或布局。Lorem ipsum 大多是由古典作家和哲学家西塞罗创作的拉丁文的一部分。它的单词和字母由于添加或去移除而被改变了，所以故意使其内容荒谬；它不是真实的，正确的，再也不是可理解的拉丁语。虽然lorem ipsum看起来仍像古典拉丁语，但实际上它没有任何意义。因为西塞罗的文本不包含K，W，Z 这几个有异于拉丁文的字母，所以这几个字母和其他一些字母常常被随机插入去模拟欧洲语言的排印样式，这些字在原文中其实并没有。`,
        images: [
          "https://avatars.githubusercontent.com/u/20592923?v=4",
          "https://avatars.githubusercontent.com/u/20592923?v=4",
          "https://avatars.githubusercontent.com/u/20592923?v=4",
        ],
        commentCount: 1,
        likeCount: 2,
        createdAt: 1620000000000,
        author: {
          name: "作者",
          avatar: "https://avatars.githubusercontent.com/u/20592923?v=4",
          circles: ["圈子1", "圈子2"],
        },
      },
      {
        type: "post",
        id: "4",
        title: "标题",
        content: `Lorem ipsum是指一篇用于网页设计、排印、布局和印刷的伪拉丁文章，其用于代替英语去强调设计元素而不是内容。它也被称为占位符文（或填充文）。它是一个很便利的模板工具。它用于帮助编排文章或演示文稿的视觉元素，如排印，字体，或布局。Lorem ipsum 大多是由古典作家和哲学家西塞罗创作的拉丁文的一部分。它的单词和字母由于添加或去移除而被改变了，所以故意使其内容荒谬；它不是真实的，正确的，再也不是可理解的拉丁语。虽然lorem ipsum看起来仍像古典拉丁语，但实际上它没有任何意义。因为西塞罗的文本不包含K，W，Z 这几个有异于拉丁文的字母，所以这几个字母和其他一些字母常常被随机插入去模拟欧洲语言的排印样式，这些字在原文中其实并没有。`,
        images: [
          "https://avatars.githubusercontent.com/u/20592923?v=4",
          "https://avatars.githubusercontent.com/u/20592923?v=4",
          "https://avatars.githubusercontent.com/u/20592923?v=4",
        ],
        commentCount: 1,
        likeCount: 2,
        createdAt: 1620000000000,
        author: {
          name: "作者",
          avatar: "https://avatars.githubusercontent.com/u/20592923?v=4",
          circles: ["圈子1", "圈子2"],
        },
      },
      {
        type: "post",
        id: "5",
        title: "标题",
        content: `Lorem ipsum是指一篇用于网页设计、排印、布局和印刷的伪拉丁文章，其用于代替英语去强调设计元素而不是内容。它也被称为占位符文（或填充文）。它是一个很便利的模板工具。它用于帮助编排文章或演示文稿的视觉元素，如排印，字体，或布局。Lorem ipsum 大多是由古典作家和哲学家西塞罗创作的拉丁文的一部分。它的单词和字母由于添加或去移除而被改变了，所以故意使其内容荒谬；它不是真实的，正确的，再也不是可理解的拉丁语。虽然lorem ipsum看起来仍像古典拉丁语，但实际上它没有任何意义。因为西塞罗的文本不包含K，W，Z 这几个有异于拉丁文的字母，所以这几个字母和其他一些字母常常被随机插入去模拟欧洲语言的排印样式，这些字在原文中其实并没有。`,
        images: [
          "https://avatars.githubusercontent.com/u/20592923?v=4",
          "https://avatars.githubusercontent.com/u/20592923?v=4",
          "https://avatars.githubusercontent.com/u/20592923?v=4",
        ],
        commentCount: 1,
        likeCount: 2,
        createdAt: 1620000000000,
        author: {
          name: "作者",
          avatar: "https://avatars.githubusercontent.com/u/20592923?v=4",
          circles: ["圈子1", "圈子2"],
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

  const hotTopicList = [
    {
      id: "1",
      sort: 1,
      name: "话题1",
      commentCount: 1,
      readCount: 2,
      avatars: [
        "https://avatars.githubusercontent.com/u/20592923?v=4",
        "https://avatars.githubusercontent.com/u/20592923?v=4",
        "https://avatars.githubusercontent.com/u/20592923?v=4",
      ],
    },
    {
      id: "2",
      sort: 2,
      name: "话题2",
      commentCount: 1,
      readCount: 2,
      avatars: [
        "https://avatars.githubusercontent.com/u/20592923?v=4",
        "https://avatars.githubusercontent.com/u/20592923?v=4",
        "https://avatars.githubusercontent.com/u/20592923?v=4",
      ],
    },
    {
      id: "3",
      sort: 3,
      name: "话题1",
      commentCount: 1,
      readCount: 2,
      avatars: [
        "https://avatars.githubusercontent.com/u/20592923?v=4",
        "https://avatars.githubusercontent.com/u/20592923?v=4",
        "https://avatars.githubusercontent.com/u/20592923?v=4",
      ],
    },
    {
      id: "4",
      sort: 4,
      name: "话题2",
      commentCount: 1,
      readCount: 2,
      avatars: [
        "https://avatars.githubusercontent.com/u/20592923?v=4",
        "https://avatars.githubusercontent.com/u/20592923?v=4",
        "https://avatars.githubusercontent.com/u/20592923?v=4",
      ],
    },
    {
      id: "5",
      sort: 5,
      name: "话题1",
      commentCount: 1,
      readCount: 2,
      avatars: [
        "https://avatars.githubusercontent.com/u/20592923?v=4",
        "https://avatars.githubusercontent.com/u/20592923?v=4",
        "https://avatars.githubusercontent.com/u/20592923?v=4",
      ],
    },
    {
      id: "6",
      sort: 6,
      name: "话题2",
      commentCount: 1,
      readCount: 2,
      avatars: [
        "https://avatars.githubusercontent.com/u/20592923?v=4",
        "https://avatars.githubusercontent.com/u/20592923?v=4",
        "https://avatars.githubusercontent.com/u/20592923?v=4",
      ],
    },
  ];

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
          <HotTopicList
            title='热门话题'
            moreText='全部话题'
            items={hotTopicList}
          />
          <HotTopicList
            title='热门圈子'
            moreText='全部圈子'
            items={hotTopicList}
          />
          <MixedList circles={items} />
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
