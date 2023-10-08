import { Avatar, List, Loading, PullRefresh, Tabs } from "@taroify/core";
import { View } from "@tarojs/components";
import { usePageScroll } from "@tarojs/taro";
import classNames from "classnames";
import { useRef, useState } from "react";

type User = {
  name: string;
  avatar: string;
};

type Application = {
  id: string;
  user: User;
  content: string;
  circleName: string;
  status: "waiting" | "pass" | "reject";
};

function UserInfo(props: {
  user: User;
  circleName: string;
  status: Application["status"];
}) {
  const {
    user: { name, avatar },
    circleName,
    status,
  } = props;

  const statusView = {
    waiting: { className: "bg-orange-1 c-orange-5", text: "待审核" },
    pass: { className: "bg-emerald-1 c-emerald-5", text: "已通过" },
    reject: { className: "bg-red-1 c-red-5", text: "未通过" },
  }[status];

  return (
    <View className='flex items-center gap-3'>
      <Avatar className='shrink-0' src={avatar} size='medium' shape='rounded' />
      <View className='grow w-0'>
        <View className='truncate'>{name}</View>
        <View className='c-gray-4 text-sm truncate'>
          申请加入的圈子：{circleName}
        </View>
      </View>
      <View
        className={classNames(
          "shrink-0 px-3 py-1 text-xs rd-2",
          statusView.className
        )}
      >
        {statusView.text}
      </View>
    </View>
  );
}

function Item(props: {
  application: Application;
  onPass: (id: string) => void;
  onReject: (id: string) => void;
}) {
  const { application, onPass, onReject } = props;

  return (
    <View className='px-4 py-3 b-b b-b-solid b-b-gray-3'>
      <UserInfo
        user={application.user}
        circleName={application.circleName}
        status={application.status}
      />
      <View className='mt-2'>{application.content}</View>
      <View className='mt-1 c-gray-4 text-sm'>
        申请时间：2021-10-10 10:10:10
      </View>
      {application.status === "waiting" ? (
        <View className='mt-2 flex justify-between items-center text-sm'>
          <View
            className='px-3 py-1 bg-gray-4 c-white rd-2'
            onClick={() => onReject(application.id)}
          >
            不通过
          </View>
          <View
            className='px-3 py-1 bg-emerald-5 c-white rd-2'
            onClick={() => onPass(application.id)}
          >
            通过
          </View>
        </View>
      ) : (
        ""
      )}
    </View>
  );
}

function ApplicationList(props: { type: Application["status"] }) {
  const { type } = props;

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
    const newList = refreshingRef.current ? [] : list;
    setTimeout(() => {
      refreshingRef.current = false;
      for (let i = 0; i < 10; i++) {
        const num = newList.length + 1;
        newList.push({
          id: num + "",
          user: {
            name: "张三",
            avatar: "https://avatars.githubusercontent.com/u/21263608?v=4",
          },
          content: "申请加入圈子",
          circleName: "圈子名称",
          status: type,
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

  function onPass(id: string) {
    console.log("pass", id);
  }

  function onReject(id: string) {
    console.log("reject", id);
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
        {list.map((item, index) => (
          <Item
            key={index}
            application={item}
            onPass={onPass}
            onReject={onReject}
          />
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
  const [currentTab, setCurrentTab] = useState(0);
  return (
    <View>
      <Tabs value={currentTab} onChange={setCurrentTab} sticky>
        <Tabs.TabPane title='未审核'>
          <ApplicationList type='waiting' />
        </Tabs.TabPane>
        <Tabs.TabPane title='已通过'>
          <ApplicationList type='pass' />
        </Tabs.TabPane>
        <Tabs.TabPane title='未通过'>
          <ApplicationList type='reject' />
        </Tabs.TabPane>
      </Tabs>
    </View>
  );
}
