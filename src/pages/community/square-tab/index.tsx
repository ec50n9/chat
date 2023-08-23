import { View } from "@tarojs/components";
import { useEffect, useRef, useState } from "react";
import { PullRefresh, List, Loading } from "@taroify/core";
import { usePageScroll } from "@tarojs/taro";
import SearchBar from "../components/search-bar";
import PostItem from "../components/post-item";
import CircleItem from "../components/circle-item";

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
        type: "circle",
        id: "1",
        name: "圈子1",
      },
      {
        type: "circle",
        id: "2",
        name: "圈子2",
      },
      {
        type: "circle",
        id: "6",
        name: "圈子3",
      },
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
