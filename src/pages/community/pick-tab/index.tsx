import {
  Toast,
  Search,
  Tabs,
  List,
  Loading,
  PullRefresh,
  Image,
} from "@taroify/core";
import { View } from "@tarojs/components";
import { useRef, useState } from "react";
import AuthorInfo from "../../../components/author-info";
import { usePageScroll } from "@tarojs/taro";
import {
  ChatOutlined,
  CommentOutlined,
  GoodJob,
  GoodJobOutlined,
  Like,
  LikeOutlined,
  Star,
  StarOutlined,
} from "@taroify/icons";
// import "./index.scss";

// 搜索栏
function SearchBar() {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <>
      <Toast open={open} onClose={() => setOpen(false)}>
        取消
      </Toast>
      <Search
        value={value}
        placeholder='请输入搜索关键词'
        action
        shape='rounded'
        onChange={(e) => setValue(e.detail.value)}
        onCancel={() => setOpen(true)}
      />
      <View className='h-1 bg-gray-2' />
    </>
  );
}

type PickItem = {
  id: string;
  content: string;
  pick: {
    pic: string;
    count: number;
    picked: boolean;
  }[];
  date: number;
  collected: boolean;
  liked: boolean;
  likeCount: number;
  commentsCount: number;
  author: {
    id: string;
    avatar: string;
    name: string;
    followed: boolean;
  };
};

// 列表项
function ListItem(props: { item: PickItem }) {
  const { item } = props;

  function handlePick(index) {
    console.log("选择了", index);
  }

  return (
    <View className='mb-3 p-3 bg-white'>
      <AuthorInfo
        followed={item.author.followed}
        id={item.author.id}
        avatar={item.author.avatar}
        name={item.author.name}
        timestamp={item.date}
        showFollowed
      />
      <View className='mt-3'>{item.content}</View>
      <View className='mt-3 flex items-center gap-2'>
        {item.pick.map((item, index) => {
          return (
            <View key={index} className='relative flex'>
              <Image className='grow h-full block' src={item.pic} />
              <View className='absolute bottom-3 right-3 c-white'>
                <View className='text-sm' onClick={() => handlePick(index)}>
                  顶{" "}
                  {item.picked ? (
                    <GoodJob size={20} />
                  ) : (
                    <GoodJobOutlined size={20} />
                  )}
                </View>
                <View className='text-xs'>{item.count}</View>
              </View>
            </View>
          );
        })}
      </View>
      <View className='flex justify-around py-1 text-sm'>
        <View className='flex items-center gap-2'>
          {item.collected ? <Star size='20' /> : <StarOutlined size='20' />}
          收藏
        </View>
        <View className='flex items-center gap-2'>
          <ChatOutlined size='20' /> {item.commentsCount}
        </View>
        <View className='flex items-center gap-2'>
          {item.liked ? <Like size='20' /> : <LikeOutlined size='20' />}
          {item.likeCount}
        </View>
      </View>
    </View>
  );
}

// 列表
function PickList(props: { listId: string }) {
  const { listId } = props;

  const [hasMore, setHasMore] = useState(true);
  const [list, setList] = useState<PickItem[]>([]);
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
    const newList: PickItem[] = refreshingRef.current ? [] : list;
    setTimeout(() => {
      refreshingRef.current = false;
      for (let i = 0; i < 10; i++) {
        const num = newList.length + 1;
        newList.push({
          id: `${listId}-${num}`,
          content:
            "这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容",
          pick: [
            {
              pic: "https://img.yzcdn.cn/vant/cat.jpeg",
              count: 1000 + num,
              picked: Math.random() > 0.5,
            },
            {
              pic: "https://img.yzcdn.cn/vant/cat.jpeg",
              count: 1000 + num,
              picked: Math.random() > 0.5,
            },
          ],
          date: Date.now(),
          collected: Math.random() > 0.5,
          liked: Math.random() > 0.5,
          likeCount: 1000 + num,
          commentsCount: 1000 + num,
          author: {
            id: `${listId}-${num}`,
            avatar: "https://img.yzcdn.cn/vant/cat.jpeg",
            name: `AI小助手${listId}-${num}`,
            followed: Math.random() > 0.5,
          },
        });
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
          <ListItem key={item.id} item={item} />
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

// 标签栏
function TabBar() {
  const [value, setValue] = useState(0);
  return (
    <Tabs value={value} onChange={setValue}>
      <Tabs.TabPane title='标签 1'>
        <PickList listId={"1"} />
      </Tabs.TabPane>
      <Tabs.TabPane title='标签 2'>内容 2</Tabs.TabPane>
      <Tabs.TabPane title='标签 3'>内容 3</Tabs.TabPane>
      <Tabs.TabPane title='标签 4'>内容 4</Tabs.TabPane>
    </Tabs>
  );
}

export default function Index() {
  return (
    <View className='min-h-screen'>
      <SearchBar />
      <TabBar />
    </View>
  );
}
