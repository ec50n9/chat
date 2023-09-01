import { Search, List, Loading, PullRefresh, Tabs } from "@taroify/core";
import { View } from "@tarojs/components";
import { usePageScroll } from "@tarojs/taro";
import { useRef, useState } from "react";
import CircleItem from "../../components/circle-item";
import PostItem from "../../components/post-item";

// 搜索栏
function SearchBar() {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <Search
      value={value}
      placeholder='请输入搜索关键词'
      action
      shape='rounded'
      onChange={(e) => setValue(e.detail.value)}
      onCancel={() => setOpen(true)}
    />
  );
}

function ResultItem(props: { item: any; type: "circle" | "post" }) {
  const { item, type } = props;

  // 根据不同的类型展示不同的item
  return {
    circle: <CircleItem circle={item} />,
    post: <PostItem post={item} />,
  }[type];
}

function ResultList(props: { listId: string }) {
  const { listId } = props;

  const [hasMore, setHasMore] = useState(true);
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const refreshingRef = useRef(false);
  const [scrollTop, setScrollTop] = useState(0);
  const [reachTop, setReachTop] = useState(true);

  usePageScroll(({ scrollTop: aScrollTop }) => {
    setScrollTop(aScrollTop);
    setReachTop(aScrollTop === 0);
  });

  const onLoad = () => {
    setLoading(true);
    // 这里需要根据listId来获取不同的内容对象，传到ResultItem中，会自动按照对应的格式展示
    const newList: any[] = refreshingRef.current ? [] : list;
    setTimeout(() => {
      refreshingRef.current = false;
      for (let i = 0; i < 10; i++) {
        const num = newList.length + 1;
        newList.push(
          // {
          //   type: "circle",
          // },
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
          }
        );
      }
      setList(newList);
      setLoading(false);
      setHasMore(newList.length < 40);
    }, 1000);
  };

  function onRefresh() {
    refreshingRef.current = true;
    setLoading(false);
    onLoad();
  }

  return (
    <PullRefresh
      loading={refreshingRef.current}
      reachTop={reachTop}
      onRefresh={onRefresh}
    >
      <List
        loading={loading}
        hasMore={hasMore}
        scrollTop={scrollTop}
        onLoad={onLoad}
      >
        {list.map((item) => (
          <ResultItem key={item.id} item={item} type={item.type} />
        ))}
        {!refreshingRef.current && (
          <List.Placeholder>
            {loading && <Loading>加载中...</Loading>}
            {!hasMore && "没有更多了"}
          </List.Placeholder>
        )}
      </List>
    </PullRefresh>
  );
}

export default function Index() {
  const [tab, setTab] = useState(0);
  const tabs = [
    {
      title: "全部",
      listId: "all",
    },
    {
      title: "圈子",
      listId: "circle",
    },
    {
      title: "内容",
      listId: "post",
    },
  ];

  return (
    <View>
      <SearchBar />
      <Tabs value={tab} onChange={setTab}>
        {tabs.map((tab) => (
          <Tabs.TabPane key={tab.listId} title={tab.title}>
            <ResultList listId={tab.listId} />
          </Tabs.TabPane>
        ))}
      </Tabs>
    </View>
  );
}
