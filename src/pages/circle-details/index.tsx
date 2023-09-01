import { View, Text } from "@tarojs/components";
import { Avatar, Image, List, Loading, PullRefresh, Tabs } from "@taroify/core";
import AuthorInfo from "../../components/author-info";
import { useRef, useState } from "react";
import loading from "@taroify/core/loading";
import Taro, { usePageScroll } from "@tarojs/taro";
import {
  ChatOutlined,
  GoodJob,
  GoodJobOutlined,
  Setting,
  Star,
  StarOutlined,
} from "@taroify/icons";

function Ellipsis(props: { content: string; rows?: number }) {
  const { content, rows = 3 } = props;
  const [show, setShow] = useState(false);

  return (
    <View className='text-gray-5'>
      <View
        className='line-clamp-3'
        style={{
          display: "-webkit-box",
          WebkitLineClamp: show ? "unset" : rows,
          lineClamp: show ? "unset" : rows,
          overflow: show ? "unset" : "hidden",
        }}
      >
        {content}
      </View>
      <View className='text-sm text-gray-5' onClick={() => setShow(!show)}>
        {show ? "收起" : "展开"}
      </View>
    </View>
  );
}

function Header() {
  const data = {
    name: "广州大学校友圈",
    cover: "https://img01.yzcdn.cn/vant/cat.jpeg",
    location: "广东广州",
    id: "784874",
    tags: ["学习", "交友"],
    members: 123,
    contents: 123,
    answers: 123,
    hot: 123,
    intro: "这是一段介绍",
    author: {
      id: "1",
      name: "张三",
      avatar: "https://img01.yzcdn.cn/vant/cat.jpeg",
      timestamp: Date.now(),
    },
    days: 123,
  };

  return (
    <View className='p-3 flex items-start b-b b-b-solid b-b-gray-3'>
      <View className='flex-grow'>
        <View className='mb-1 text-lg'>{data.name}</View>
        <View className='text-sm text-gray-5'>IP 归属地：{data.location}</View>
        <View className='text-sm text-gray-5'>圈子号：{data.id}</View>
        <View className='mt-2 flex flex-wrap gap-3'>
          {data.tags.map((tag, index) => (
            <View key={index} className='px-2 text-sm bg-gray-2 rounded'>
              {tag}
            </View>
          ))}
        </View>
      </View>
      <View className='flex-shrink-0 h-xs w-xs bg-amber rd of-hidden'>
        <Image className='w-full h-full' src={data.cover} mode='aspectFill' />
      </View>
    </View>
  );
}

function Statistics() {
  const data = {
    members: 12356,
    contents: 123,
    answers: 123,
    hot: 123,
  };

  return (
    <View className='p-3 flex justify-around items-center b-b b-b-solid b-b-gray-3'>
      <View className='text-center'>
        <View className='text-lg'>{data.members}</View>
        <View className='text-sm'>成员</View>
      </View>
      <View className='h-56 w-2 bg-gray-2' />
      <View className='text-center'>
        <View className='text-lg'>{data.contents}</View>
        <View className='text-sm'>内容</View>
      </View>
      <View className='h-56 w-2 bg-gray-2' />
      <View className='text-center'>
        <View className='text-lg'>{data.answers}</View>
        <View className='text-sm'>回答</View>
      </View>
      <View className='h-56 w-2 bg-gray-2' />
      <View className='text-center'>
        <View className='text-lg'>{data.hot}</View>
        <View className='text-sm'>热度</View>
      </View>
    </View>
  );
}

function Intro() {
  const intro =
    "这是一段介绍。这是一段介绍。这是一段介绍。这是一段介绍。这是一段介绍。这是一段介绍。这是一段介绍。这是一段介绍。这是一段介绍。这是一段介绍。这是一段介绍。";

  return (
    <View className='p-3'>
      <View className='text-lg'>圈子介绍</View>
      {/* <View className='mt-1 text-gray-5'>{intro}</View> */}
      <Ellipsis content={intro} />
    </View>
  );
}

function Author() {
  const data = {
    name: "张三",
    avatar: "https://img01.yzcdn.cn/vant/cat.jpeg",
    days: 123,
  };

  return (
    <View className='p-3 flex items-center gap-3'>
      <View className='flex-shrink-0 w-96 h-96 rd-full of-hidden'>
        <Image className='w-full h-full' src={data.avatar} mode='aspectFill' />
      </View>
      <View className='flex-grow'>
        <View>圈主：{data.name}</View>
        <View className='text-sm text-gray-5'>创建 {data.days} 天</View>
      </View>
    </View>
  );
}

function CircleItem(props: { data: any }) {
  const {
    data: { id, content, cover, author },
  } = props;

  return (
    <View className='p-3 rd rd-4 b-2 b-solid b-gray-3'>
      <AuthorInfo
        id={author.id}
        name={author.name}
        avatar={author.avatar}
        timestamp={author.timestamp}
      />
      <View className='py-1'>
        <Ellipsis content={content} />
      </View>
      <View className='w-full h-lg rd-lg of-hidden'>
        <Image className='w-full h-full' src={cover} mode='aspectFill' />
      </View>
    </View>
  );
}

function CircleList() {
  const circles = [
    {
      id: "1",
      content: "这是一段内容",
      cover: "https://img01.yzcdn.cn/vant/cat.jpeg",
      author: {
        id: "1",
        name: "张三",
        avatar: "https://img01.yzcdn.cn/vant/cat.jpeg",
        timestamp: Date.now(),
      },
    },
    {
      id: "2",
      content: "这是一段内容",
      cover: "https://img01.yzcdn.cn/vant/cat.jpeg",
      author: {
        id: "1",
        name: "张三",
        avatar: "https://img01.yzcdn.cn/vant/cat.jpeg",
        timestamp: Date.now(),
      },
    },
  ];

  return (
    <View className='px-3'>
      <View className='text-xl'>圈子内容</View>
      <View className='mt-2 flex flex-col gap-y-4'>
        {circles.map((circle, index) => (
          <CircleItem key={index} data={circle} />
        ))}
      </View>
    </View>
  );
}

// 圈子亮点
function Highlights() {
  const imgs = [
    "https://img01.yzcdn.cn/vant/cat.jpeg",
    "https://img01.yzcdn.cn/vant/cat.jpeg",
  ];

  return (
    <View className='p-3'>
      <View className='text-xl'>圈子亮点</View>
      <View className='mt-2 flex flex-col'>
        {imgs.map((img, index) => (
          <Image key={index} className='w-full' src={img} />
        ))}
      </View>
    </View>
  );
}

function BottomBar() {
  return (
    <View className='fixed bottom-0 left-0 right-0 bg-white b-t b-t-solid b-t-gray-3'>
      <View className='flex items-center py-2 px-3'>
        <View className='flex-grow'>
          <View className='sm'>￥ 0.00</View>
          <View className='text-xs text-gray-5'>有效期：365 天</View>
        </View>
        <View className='text-sm bg-gray-7 text-white px-4 py-1.5 rd'>
          立刻加入
        </View>
      </View>
    </View>
  );
}

function JoinedHeader(props: {
  isMine: boolean;
  bg: string;
  avatar: string;
  name: string;
  fullName: string;
  author: {
    avatar: string;
    nickname: string;
  };
}) {
  const [showFullName, setShowFullName] = useState(false);

  return (
    <View className='h-400 relative'>
      <View className='absolute inset-0 -z-10'>
        <Image className='w-full h-full' src={props.bg} mode='aspectFill' />
      </View>
      <View className='absolute top-1/2 -translate-y-1/2 w-full'>
        <View className='flex gap-3 px-3'>
          {/* 圈子头像 */}
          <Avatar
            className='shrink-0'
            src={props.avatar}
            size='large'
            shape='rounded'
          />
          {/* 圈子名称 */}
          <View className='grow flex flex-col justify-between'>
            <View className='flex items-center gap-3 text-lg c-white'>
              {showFullName ? props.fullName : props.name}
              <Text
                className='bg-white text-xs c-gray-7 px-2 py-1 rd-full'
                onClick={() => setShowFullName(!showFullName)}
              >
                {showFullName ? "简称" : "全称"}
              </Text>
            </View>
            {/* 作者 */}
            <View className='flex items-center'>
              <Avatar src={props.author.avatar} size='small' />
              <Text className='text-xs c-white'>{props.author.nickname}</Text>
            </View>
          </View>
          {/* 右侧操作按钮 */}
          <View className='shrink-0 flex flex-col gap-2 items-end c-gray-7'>
            <Setting size={24} />
            <View className="text-xs px-2 py-1 bg-gray-7 c-white rd-full">分享</View>
          </View>
        </View>
      </View>
    </View>
  );
}

function JoinedCircleItem(props: {
  data: {
    id: string;
    content: string;
    coverList: string[];
    collectCount: number;
    collected: boolean;
    commentCount: number;
    likeCount: number;
    liked: boolean;
    author: any;
  };
}) {
  const {
    data: {
      id,
      content,
      coverList,
      collectCount,
      collected,
      commentCount,
      likeCount,
      liked,
      author,
    },
  } = props;

  return (
    <View className='p-3 pb-0 rd rd-4 b-2 b-solid b-gray-3'>
      <AuthorInfo
        id={author.id}
        name={author.name}
        avatar={author.avatar}
        timestamp={author.timestamp}
      />

      <View className='py-1'>
        <Ellipsis content={content} />
      </View>

      <View className='w-full h-md flex gap-3'>
        {coverList.map((cover, index) => (
          <Image
            key={index}
            className='grow h-full rd-lg of-hidden'
            src={cover}
            mode='aspectFill'
          />
        ))}
      </View>

      <View className='flex justify-around text-sm'>
        <View className='flex gap-2 items-center py-4'>
          {collected ? <Star size={22} /> : <StarOutlined size={22} />}
          <Text>{collectCount || "收藏"}</Text>
        </View>
        <View className='flex gap-2 items-center py-4'>
          <ChatOutlined size={22} />
          <Text>{commentCount || "评论"}</Text>
        </View>
        <View className='flex gap-2 items-center py-4'>
          {liked ? <GoodJob size={22} /> : <GoodJobOutlined size={22} />}
          <Text>{likeCount || "点赞"}</Text>
        </View>
      </View>
    </View>
  );
}

function JoinedCircleList(props: { listId: string }) {
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
    const newList: any[] = refreshingRef.current ? [] : list;
    setTimeout(() => {
      refreshingRef.current = false;
      for (let i = 0; i < 10; i++) {
        const num = newList.length + 1;
        newList.push({
          id: `${listId}-${num}`,
          content: "这是一段内容",
          coverList: [
            "https://img01.yzcdn.cn/vant/cat.jpeg",
            "https://img01.yzcdn.cn/vant/cat.jpeg",
            "https://img01.yzcdn.cn/vant/cat.jpeg",
          ],
          collectCount: 123,
          collected: false,
          commentCount: 123,
          likeCount: 123,
          liked: true,
          author: {
            id: "1",
            name: "张三",
            avatar: "https://img01.yzcdn.cn/vant/cat.jpeg",
            timestamp: Date.now(),
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
        <View className='flex flex-col gap-3 py-3'>
          {list.map((item, index) => (
            <JoinedCircleItem key={index} data={item} />
          ))}
          {!refreshingRef.current && (
            <List.Placeholder>
              {loading && <Loading>加载中...</Loading>}
              {!hasMore && "没有更多了"}
            </List.Placeholder>
          )}
        </View>
      </List>
    </PullRefresh>
  );
}

export default function Index() {
  const [joined, setJoined] = useState(true);

  const tabs = [
    {
      name: "全部",
      tag: "all",
    },
    {
      name: "新发布",
      tag: "new",
    },
    {
      name: "新回复",
      tag: "reply",
    },
    {
      name: "等我回答",
      tag: "answer",
    },
  ];
  const [currentTab, setCurrentTab] = useState(0);

  const handleChange = (index: number) => {
    setCurrentTab(index);
    Taro.pageScrollTo({
      scrollTop: 0,
      duration: 300,
    });
  };

  return (
    <View className='text-base pb-24'>
      {joined ? (
        <>
          <JoinedHeader
            isMine={false}
            bg='https://img01.yzcdn.cn/vant/cat.jpeg'
            avatar='https://img01.yzcdn.cn/vant/cat.jpeg'
            name='广东大学圈'
            fullName='广东大学校友圈'
            author={{
              avatar: "https://img01.yzcdn.cn/vant/cat.jpeg",
              nickname: "梁从心",
            }}
          />
          <View className='relative bg-white -mt-4 px-3 pb-3 rd-t-4 z-10 of-hidden'>
            <Tabs value={currentTab} onChange={handleChange} lazyRender sticky>
              {tabs.map((tab, index) => (
                <Tabs.TabPane key={index} title={tab.name}>
                  <JoinedCircleList listId={tab.tag} />
                </Tabs.TabPane>
              ))}
            </Tabs>
          </View>
        </>
      ) : (
        <>
          <Header />
          <Statistics />
          <Intro />
          <Author />
          <Highlights />
          <CircleList />
          <BottomBar />
        </>
      )}
    </View>
  );
}
