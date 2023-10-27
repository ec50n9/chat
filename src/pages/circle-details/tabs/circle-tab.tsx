import { List, Loading, PullRefresh, Tabs } from "@taroify/core";
import {
  Star,
  StarOutlined,
  ChatOutlined,
  GoodJob,
  GoodJobOutlined,
} from "@taroify/icons";
import { View, Image, Text } from "@tarojs/components";
import Taro, { usePageScroll } from "@tarojs/taro";
import { useRef, useState } from "react";
import AuthorInfo from "../../../components/author-info";
import EcEllipsis from "../../../components/ec-ellipsis";

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
    tags: string[];
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
      tags,
    },
  } = props;

  const previewImage = (current: string) => {
    Taro.previewImage({
      current,
      urls: coverList,
    });
  };

  return (
    <View className='flex flex-col p-3 pb-0 rd rd-4 b-2 b-solid b-gray-3'>
      <AuthorInfo
        id={author.id}
        name={author.name}
        avatar={author.avatar}
        timestamp={author.timestamp}
      />

      <View className='py-1'>
        {/* <Ellipsis content={content} name={`joined-circle-item-${id}`} /> */}
        <EcEllipsis content={content} visibleCount={50} unfoldable />
      </View>

      <View className='grid grid-cols-3 gap-2'>
        {coverList.map((cover, index) => (
          <Image
            key={index}
            src={cover}
            className='w-full h-full object-cover rd-3'
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              previewImage(cover);
            }}
          />
        ))}
      </View>

      {/* 标签列表 */}
      <View className='mt-3 flex items-center gap-2'>
        {tags.map((tag, index) => (
          <Text
            key={index}
            className='px-3 py-1 text-xs bg-gray-2 c-gray-7 rd-2'
          >
            # {tag}
          </Text>
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
  const refreshingRef = useRef(true);
  const [scrollTop, setScrollTop] = useState(0);
  const [reachTop, setReachTop] = useState(true);

  usePageScroll(({ scrollTop: aScrollTop }) => {
    setScrollTop(aScrollTop);
    setReachTop(aScrollTop === 0);
  });

  const getTopCircles = () =>
    new Promise((resolve, reject) => {
      resolve([
        {
          id: `${listId}-top`,
          content: `这是一条置顶数据`,
          coverList: [],
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
          tags: ["标签1", "标签2", "标签3"],
        },
      ]);
    });

  const getCirclePage = (params: { pageSize: number; pageNo: number }) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        const newList: any[] = [];
        for (let i = 0; i < 10; i++) {
          const num = newList.length + 1;
          newList.push({
            id: `${listId}-${num}`,
            content: `广州永泰竞技足球俱乐部八项基本规定
          一、遵守体育道德，尊重球队，尊重队友，尊重对手；
          二、坚持以球会友，团结友爱，一日队友，友情长存；
          三、实行民主集中，队长负责，集体管理，履职尽责；
          四、服从球队管理，遵守规定，队长带头，队员遵从；
          五、按时缴纳队费，收支透明，无故拖欠，视同退队；
          六、严肃报名纪律，如有空降，严禁上场，共同监督；
          七、比赛教练排阵，主力优先，普通约战，均衡出场；
          八、倡导群策群力，能者多劳，全员参与，造福球队。
          （违反队规，一次提醒，二次警告，三次清退）`,
            coverList: [
              "https://img01.yzcdn.cn/vant/cat.jpeg",
              "https://img01.yzcdn.cn/vant/cat.jpeg",
              "https://img01.yzcdn.cn/vant/cat.jpeg",
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
            tags: ["标签1", "标签2", "标签3"],
          });
        }
        resolve(newList);
      }, 1000);
    });

  const onLoad = () => {
    setLoading(true);
    const newList: any[] = refreshingRef.current ? [] : list;

    // 加载正常数据
    const taskList = [getCirclePage({ pageSize: 10, pageNo: 1 })];
    // 如果是刷新的话，则在前面加上指定的数据
    refreshingRef.current && taskList.unshift(getTopCircles());
    // 批量请求
    Promise.all(taskList).then((results) => {
      refreshingRef.current = false;
      // 将请求结果展开合并
      newList.push(...results.flat());

      setList(newList);
      setLoading(false);
      setHasMore(newList.length < 40);
    });
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

export default function CircleTab() {
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
    <Tabs value={currentTab} onChange={handleChange} lazyRender sticky>
      {tabs.map((tab, index) => (
        <Tabs.TabPane key={index} title={tab.name}>
          <JoinedCircleList listId={tab.tag} />
        </Tabs.TabPane>
      ))}
    </Tabs>
  );
}
