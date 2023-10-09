import {
  Button,
  Cell,
  Dialog,
  List,
  Loading,
  PullRefresh,
  Tabs,
  Toast,
  Form,
  Input,
} from "@taroify/core";
import { View, Image, FormProps, BaseEventOrig } from "@tarojs/components";
import { nextTick, usePageScroll } from "@tarojs/taro";
import dayjs from "dayjs";
import { useRef, useState } from "react";
import classNames from "classnames";
import { FormInstance } from "@taroify/core/form";

type WorksItemStatus = "pass" | "underReview" | "notPass";

type WorksItem = {
  id: string;
  title: string;
  cover?: string;
  publicTime: number;
  hot: number;
  like: number;
  comment: number;
  collect: number;
  status: WorksItemStatus;
};

function WorksItemView(props: {
  item: WorksItem;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const { item, onEdit, onDelete } = props;

  const viewData = [
    {
      name: "热度",
      value: item.hot,
    },
    {
      name: "点赞",
      value: item.like,
    },
    {
      name: "评论",
      value: item.comment,
    },
    {
      name: "收藏",
      value: item.collect,
    },
  ];

  const statusMap = useRef({
    pass: "已通过",
    underReview: "审核中",
    notPass: "未通过",
  });

  return (
    <View className='m-3 p-3 bg-white rd-3'>
      <View className='flex items-center gap-3'>
        {item.cover ? (
          <Image
            className='shrink-0 w-96 h-96 rd-2 of-hidden'
            src={item.cover}
          />
        ) : (
          ""
        )}

        <View className='grow w-0 flex flex-col gap-1'>
          <View className='text-base truncate'>{item.title}</View>
          <View className='text-sm c-gray-4'>
            发布时间: {dayjs(item.publicTime).format("YYYY-MM-DD")}
          </View>
        </View>

        <View className='shrink-0'>
          <View
            className={classNames("px-2 py-0.5 c-gray-6 text-xs rd-1", {
              "bg-green-1 c-green-7": item.status === "pass",
              "bg-yellow-1 c-yellow-7": item.status === "underReview",
              "bg-red-1 c-red-7": item.status === "notPass",
            })}
          >
            {statusMap.current[item.status]}
          </View>
        </View>
      </View>

      <View className='mt-3 flex justify-around'>
        {viewData.map((dataItem, index) => (
          <View key={index} className='flex flex-col items-center'>
            <View className='text-base'>{dataItem.value}</View>
            <View className='text-sm c-gray-4'>{dataItem.name}</View>
          </View>
        ))}
      </View>

      <View className='mt-3 flex justify-between'>
        <View
          className='px-5 py-0.5 b-1 b-solid b-gray-3 c-gray-6 text-sm rd-2'
          onClick={() => onEdit(item.id)}
        >
          编辑
        </View>
        <View
          className='px-5 py-0.5 b-1 b-solid b-gray-3 c-gray-6 text-sm rd-2'
          onClick={() => onDelete(item.id)}
        >
          删除
        </View>
      </View>
    </View>
  );
}

function MyWorks(props: {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const [hasMore, setHasMore] = useState(true);
  const [list, setList] = useState<WorksItem[]>([]);
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
    const newList: WorksItem[] = refreshingRef.current ? [] : list;
    setTimeout(() => {
      refreshingRef.current = false;
      // 这里推数据到数组中
      newList.push(
        {
          id: "1",
          title: "作品标题",
          cover: "https://img.yzcdn.cn/vant/cat.jpeg",
          publicTime: 1624300800000,
          hot: 100,
          like: 100,
          comment: 100,
          collect: 100,
          status: "pass",
        },
        {
          id: "2",
          title: "这是标题，默认一行",
          publicTime: Date.now(),
          hot: 100,
          like: 100,
          comment: 100,
          collect: 100,
          status: "notPass",
        }
      );

      setList(newList);
      setLoading(false);
      setHasMore(newList.length < 40);
    }, 0);
  };

  const onRefresh = () => {
    refreshingRef.current = true;
    setLoading(false);
    onLoad();
  };

  return (
    <View>
      <View className='p-4 pb-0 text-xl c-gray-6'>3 篇作品</View>
      <View>
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
              <WorksItemView
                key={index}
                item={item}
                onEdit={props.onEdit}
                onDelete={props.onDelete}
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
      </View>
    </View>
  );
}

function UnderReview(props: {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const [hasMore, setHasMore] = useState(true);
  const [list, setList] = useState<WorksItem[]>([]);
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
    const newList: WorksItem[] = refreshingRef.current ? [] : list;
    setTimeout(() => {
      refreshingRef.current = false;
      // 这里推数据到数组中
      newList.push(
        {
          id: "1",
          title: "作品标题",
          cover: "https://img.yzcdn.cn/vant/cat.jpeg",
          publicTime: 1624300800000,
          hot: 100,
          like: 100,
          comment: 100,
          collect: 100,
          status: "underReview",
        },
        {
          id: "2",
          title: "这是标题，默认一行",
          publicTime: Date.now(),
          hot: 100,
          like: 100,
          comment: 100,
          collect: 100,
          status: "underReview",
        }
      );

      setList(newList);
      setLoading(false);
      setHasMore(newList.length < 40);
    }, 0);
  };

  const onRefresh = () => {
    refreshingRef.current = true;
    setLoading(false);
    onLoad();
  };

  return (
    <View>
      <View className='p-4 pb-0 text-xl c-gray-6'>3 篇作品</View>
      <View>
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
              <WorksItemView
                key={index}
                item={item}
                onEdit={props.onEdit}
                onDelete={props.onDelete}
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
      </View>
    </View>
  );
}

function NotPass(props: {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const [hasMore, setHasMore] = useState(true);
  const [list, setList] = useState<WorksItem[]>([]);
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
    const newList: WorksItem[] = refreshingRef.current ? [] : list;
    setTimeout(() => {
      refreshingRef.current = false;
      // 这里推数据到数组中
      newList.push(
        {
          id: "1",
          title: "作品标题",
          cover: "https://img.yzcdn.cn/vant/cat.jpeg",
          publicTime: 1624300800000,
          hot: 100,
          like: 100,
          comment: 100,
          collect: 100,
          status: "notPass",
        },
        {
          id: "2",
          title: "这是标题，默认一行",
          publicTime: Date.now(),
          hot: 100,
          like: 100,
          comment: 100,
          collect: 100,
          status: "notPass",
        }
      );

      setList(newList);
      setLoading(false);
      setHasMore(newList.length < 40);
    }, 0);
  };

  const onRefresh = () => {
    refreshingRef.current = true;
    setLoading(false);
    onLoad();
  };

  return (
    <View>
      <View className='p-4 pb-0 text-xl c-gray-6'>3 篇作品</View>
      <View>
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
              <WorksItemView
                key={index}
                item={item}
                onEdit={props.onEdit}
                onDelete={props.onDelete}
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
      </View>
    </View>
  );
}

function BasicTabs() {
  const [current, setCurrent] = useState(0);

  const [dialogOpen, setDialogOpen] = useState(false);

  const dialogRef = useRef<FormInstance>(null);
  const onEdit = (id: string) => {
    setDialogOpen(true);

    // 这里根据id获取到对应的数据，然后填充到表单中
    nextTick(() => {
      dialogRef.current?.setValues({
        like: 100,
        comment: 100,
        collect: 100,
      });
    });
  };

  const onEditSubmit = (
    event: BaseEventOrig<FormProps.onSubmitEventDetail>
  ) => {
    // 这里做更新提交逻辑
    console.log(event.detail.value);
    setDialogOpen(false);
  };

  const onDelete = (id: string) => {};

  return (
    <>
      <Tabs value={current} onChange={setCurrent} sticky>
        <Tabs.TabPane title='我的作品'>
          <MyWorks onEdit={onEdit} onDelete={onDelete} />
        </Tabs.TabPane>
        <Tabs.TabPane title='审核中'>
          <UnderReview onEdit={onEdit} onDelete={onDelete} />
        </Tabs.TabPane>
        <Tabs.TabPane title='未通过'>
          <NotPass onEdit={onEdit} onDelete={onDelete} />
        </Tabs.TabPane>
      </Tabs>

      {/* 编辑弹窗 */}
      <Dialog open={dialogOpen} onClose={setDialogOpen}>
        <Dialog.Content>
          <Form ref={dialogRef} onSubmit={onEditSubmit}>
            <Toast id='toast' />
            <Cell.Group inset>
              <Form.Item
                name='like'
                rules={[{ required: true, message: "请填写点赞数" }]}
              >
                <Form.Label>点赞数</Form.Label>
                <Form.Control>
                  <Input type='number' placeholder='请填写点赞数' />
                </Form.Control>
              </Form.Item>

              <Form.Item
                name='comment'
                rules={[{ required: true, message: "请填写评论数" }]}
              >
                <Form.Label>评论数</Form.Label>
                <Form.Control>
                  <Input type='number' placeholder='请填写评论数' />
                </Form.Control>
              </Form.Item>

              <Form.Item
                name='collect'
                rules={[{ required: true, message: "请填写收藏数" }]}
              >
                <Form.Label>收藏数</Form.Label>
                <Form.Control>
                  <Input type='number' placeholder='请填写收藏数' />
                </Form.Control>
              </Form.Item>
            </Cell.Group>
            <View style={{ margin: "16px" }}>
              <Button shape='round' block color='primary' formType='submit'>
                提交
              </Button>
            </View>
          </Form>
        </Dialog.Content>
      </Dialog>
    </>
  );
}

export default function Index() {
  return (
    <View className='bg-gray-1 c-gray-7'>
      <BasicTabs />
    </View>
  );
}
