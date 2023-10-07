import { View, Image, Text, Textarea } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect, useMemo, useState } from "react";
import {
  CommentOutlined,
  GoodJobOutlined,
  GoodJob,
  ShareOutlined,
  Share,
  ArrowDown,
  ChatOutlined,
  LikeOutlined,
  Like,
  Smile,
  Photo,
  Location,
  SmileOutlined,
  Checked,
} from "@taroify/icons";
import "@taroify/icons/index.scss";
import { Flex, Input, Button, Empty, Popup, Avatar } from "@taroify/core";
import dayjs from "dayjs";
import AuthInfo from "../../components/author-info";
import {
  Post,
  PostComment,
  getPostCommentsByPostId,
  getPostsById,
} from "../community/api";
import EcEllipsis from "../../components/ec-ellipsis";

function PostContent(props: { content: string }) {
  const { content } = props;
  return (
    <View className='mt-3 text-base'>
      <View dangerouslySetInnerHTML={{ __html: content }} />
    </View>
  );
}

function Actions(props: { post: Post }) {
  const { post } = props;
  const [liked, setLiked] = useState(false);

  const actions = [
    {
      icon: <ShareOutlined />,
      text: post.commentCount,
      onClick: () => {},
    },
    {
      icon: <CommentOutlined />,
      text: post.commentCount,
      onClick: () => {},
    },
    {
      icon: liked ? <GoodJob color='#e76038' /> : <GoodJobOutlined />,
      text: post.likeCount,
      onClick: () => setLiked(!liked),
    },
  ];

  return (
    <View className='flex justify-around py-5'>
      {actions.map((action, index) => (
        <View
          key={index}
          className='flex items-center gap-1 text-xl'
          onClick={action.onClick}
        >
          {action.icon}
          <View className='text-base'>{action.text}</View>
        </View>
      ))}
    </View>
  );
}

function ChildrenComment(props: {
  comment: PostComment;
  onReply: (
    id: PostComment["id"],
    nickname: PostComment["sendUser"]["name"]
  ) => void;
}) {
  return (
    <View className='flex gap-2'>
      {/* 子评论评论者头像 */}
      <Image
        className='shrink-0 w-40 h-40 b-2 b-solid b-gray-3 rd-full of-hidden'
        src={props.comment.sendUser.avatar}
      />
      <View className='grow'>
        {/* 子评论用户名 */}
        <View className='text-sm c-gray-4'>
          {/* 发送者昵称 */}
          <EcEllipsis content={props.comment.sendUser.name} visibleCount={3} />
          {/* 二级评论可能不需要展示被回复者昵称，三级评论才需要，所以控制一下，二级评论设置replyUser为null即可 */}
          {props.comment.replyUser ? (
            <>
              <Text className='inline-block mx-1 c-gray-7'>回复</Text>
              {/* 被回复者昵称 */}
              <EcEllipsis
                content={props.comment.replyUser?.name || ""}
                visibleCount={3}
              />
            </>
          ) : (
            ""
          )}
        </View>
        {/* 子评论内容 */}
        <View
          className='mt-1'
          onClick={() =>
            props.onReply(props.comment.id, props.comment.sendUser.name)
          }
        >
          <EcEllipsis
            content={props.comment.content}
            visibleCount={30}
            unfoldable
          />
        </View>
        {/* 日期和地区 */}
        <View className='my-1 flex gap-3 text-sm c-gray-4'>
          <Text>{dayjs(props.comment.createdAt).format("MM-DD")}</Text>
          <Text>{props.comment.ipLocation}</Text>
          {/* 点赞 */}
          <View className='grow flex justify-end gap-4'>
            <Text className='flex gap-1 items-center'>
              <ChatOutlined size={18} />
              {props.comment.commentCount}
            </Text>
            <Text className='flex gap-1 items-center'>
              {props.comment.liked ? (
                <Like size={18} />
              ) : (
                <LikeOutlined size={18} />
              )}
              {props.comment.likeCount}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

function Comment(props: {
  comment: PostComment;
  childrenList?: PostComment[];
  childrenTotal?: number;
  onReply: (
    id: PostComment["id"],
    nickname: PostComment["sendUser"]["name"]
  ) => void;
  onLoadMore: (id: PostComment["id"]) => void;
}) {
  const { comment, childrenList, childrenTotal, onReply, onLoadMore } = props;

  const [fold, setFold] = useState(true);

  const hasMore = useMemo(
    () => (childrenList?.length || 0) < (childrenTotal || 0),
    [childrenList, childrenTotal]
  );

  return (
    <View className='flex gap-2'>
      {/* 评论者头像 */}
      <Image
        className='shrink-0 w-56 h-56 b-2 b-solid b-gray-3 rd-full of-hidden'
        src={comment.sendUser.avatar}
      />
      <View className='grow pb-3 b-b-2 b-b-solid b-b-gray-3'>
        {/* 评论者昵称 */}
        <View className='c-gray-4 text-sm'>
          <EcEllipsis content={comment.sendUser.name} visibleCount={3} />
        </View>
        {/* 评论内容 */}
        <View
          className='mt-1'
          onClick={() => onReply(comment.id, comment.sendUser.name)}
        >
          <EcEllipsis content={comment.content} visibleCount={30} unfoldable />
        </View>
        {/* 日期和地区 */}
        <View className='my-1 flex gap-3 text-sm c-gray-4'>
          <Text>{dayjs(comment.createdAt).format("MM-DD")}</Text>
          <Text>{comment.ipLocation}</Text>
          {/* 点赞 */}
          <View className='grow flex justify-end gap-4'>
            <Text className='flex gap-1 items-center'>
              <ChatOutlined size={18} />
              {comment.commentCount}
            </Text>
            <Text className='flex gap-1 items-center'>
              {comment.liked ? <Like size={18} /> : <LikeOutlined size={18} />}
              {comment.likeCount}
            </Text>
          </View>
        </View>
        {/* 子评论 */}
        {fold ? (
          ""
        ) : (
          <View className='mt-2 flex flex-col gap-2'>
            {childrenList?.map((children) => (
              // 子评论
              <ChildrenComment
                key={children.id}
                comment={children}
                onReply={onReply}
              />
            ))}
          </View>
        )}
        {/* 额外操作 */}
        <View className='mt-1 flex gap-3 text-sm c-gray-4'>
          {/* 展开 */}
          {fold && (childrenList?.length || 0) > 0 ? (
            <Text onClick={() => setFold(false)}>展开</Text>
          ) : hasMore ? (
            // 加载更多
            <Text
              onClick={() => {
                setFold(false);
                onLoadMore(comment.id);
              }}
            >
              加载更多
            </Text>
          ) : (
            ""
          )}
          {/* 展开/收起 */}
          {!fold ? <Text onClick={() => setFold(true)}>收起</Text> : ""}
        </View>
      </View>
    </View>
  );
}

function CommentList(props: { comments: PostComment[] }) {
  const { comments } = props;

  const rootList = useMemo(
    () => comments.filter((i) => i.rootCommentId === null),
    [comments]
  );

  const childrenMap = useMemo(
    () =>
      comments.reduce((prev, cur) => {
        if (!prev?.has(cur.rootCommentId)) {
          prev.set(cur.rootCommentId, []);
        }
        prev.get(cur.rootCommentId)?.push(cur);
        return prev;
      }, new Map<string, PostComment[]>()),
    [comments]
  );

  const [replyingId, setReplyingId] = useState("");
  const [placeHolder, setPlaceHolder] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);

  const handleReply = (
    id: PostComment["id"],
    nickname: PostComment["sendUser"]["name"]
  ) => {
    setReplyingId(id);
    setPlaceHolder(`回复 ${nickname}`);
    setPopupOpen(true);
  };

  const handleLoadMore = (id: PostComment["id"]) => {
    console.log("loading: ", id);
  };

  const handleSendComment = (comment: string) => {
    console.log("正在发送 ", comment, " 到 ", replyingId);
    setPopupOpen(false);
  };

  return (
    <View className='pb-15'>
      <View className='flex justify-between items-center mb-3'>
        <View className='text-xl'>评论</View>
        <View className='text-base c-gray-4'>{comments.length} 条</View>
      </View>
      {rootList?.length ? (
        <View className='flex flex-col gap-3'>
          {rootList.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              childrenList={childrenMap.get(comment.id)}
              childrenTotal={2}
              onReply={handleReply}
              onLoadMore={handleLoadMore}
            />
          ))}
        </View>
      ) : (
        <Empty>
          <Empty.Image />
          <Empty.Description>暂无评论</Empty.Description>
        </Empty>
      )}
      <CommentInputBar
        replyingId={replyingId}
        placeHolder={placeHolder}
        onClick={() => setPopupOpen(true)}
        onSend={() => {}}
      />
      <RealCommentInputBar
        open={popupOpen}
        replyingId={replyingId}
        placeHolder={placeHolder}
        onSend={handleSendComment}
        onClose={() => setPopupOpen(false)}
      />
    </View>
  );
}

function PageContent(props: { post: Post; comments: PostComment[] }) {
  const { post, comments } = props;

  return (
    <View className='pt-3'>
      <View className='auth-info'>
        <AuthInfo
          name={post.author.name}
          avatar={post.author.avatar}
          timestamp={post.createdAt}
          showFollowed
        />
      </View>
      <PostContent content={post.content} />
      <Actions post={post} />
      {/* 位置和来源 */}
      <View className='pb-3 flex justify-between items-center text-sm c-gray-3'>
        <View>
          来自 <Text className='c-gray-5'>汕头大学校友圈</Text>
        </View>
        <View>
          发布于 <Text className='c-gray-5'>广东</Text>
        </View>
      </View>
      <CommentList comments={comments} />
    </View>
  );
}

function RealCommentInputBar(props: {
  open: boolean;
  replyingId: string;
  placeHolder: string;
  onSend: (content: string) => void;
  onClose: () => void;
}) {
  const [maskList, setMaskList] = useState([
    {
      id: "1",
      avatar: "https://avatars.githubusercontent.com/u/20592923?v=4",
      nickname: "陈家坤",
    },
    {
      id: "2",
      avatar: "https://avatars.githubusercontent.com/u/20592923?v=4",
      nickname: "在厦门钓鱼的菠菜",
    },
    {
      id: "3",
      avatar: "https://avatars.githubusercontent.com/u/20592923?v=4",
      nickname: "在厦门钓鱼的菠菜·清华大学学生 在厦门钓鱼的菠菜·清华大学学生",
    },
  ]);

  const [currentMaskIndex, setCurrentMaskIndex] = useState(0);
  const [maskListVisible, setMaskListVisible] = useState(false);

  const currentMask = useMemo(
    () => maskList[currentMaskIndex],
    [maskList, currentMaskIndex]
  );

  const [comment, setComment] = useState("");

  return (
    <Popup open={props.open} onClose={props.onClose} placement='bottom' rounded>
      <View className='px-4 py-3'>
        {/* 身份选择 */}
        {maskListVisible ? (
          <View className='mb-5 flex flex-col gap-3'>
            {maskList.map((mask, index) => (
              <View
                key={mask.id}
                className='flex items-center gap-2'
                onClick={() => {
                  setCurrentMaskIndex(index);
                  setMaskListVisible(false);
                }}
              >
                <Avatar className='shrink-0' src={mask.avatar} />
                <Text className='grow w-0 truncate'>{mask.nickname}</Text>
                {currentMaskIndex === index ? (
                  <Checked className='shrink-0' size={20} />
                ) : (
                  ""
                )}
              </View>
            ))}
          </View>
        ) : (
          ""
        )}
        {/* 当前身份 */}
        <View
          className='flex items-center gap-2'
          onClick={() => setMaskListVisible(true)}
        >
          <Avatar className='shrink-0' src={currentMask.avatar} size='small' />
          <Text className='grow w-0 text-sm truncate'>
            {currentMask.nickname}
          </Text>
        </View>

        {/* 信息输入框 */}
        <View className='mt-3 flex items-center gap-2'>
          <Textarea
            className='grow w-0 px-3 py-2 min-h-80 bg-gray-1 rd-3 of-hidden'
            placeholder={props.placeHolder}
            value={comment}
            onInput={(e) => setComment(e.detail.value)}
            autoFocus
            autoHeight
          />
          <View
            className='shrink-0 px-3 text-sm'
            onClick={() => {
              props.onSend(comment);
              setComment("");
            }}
          >
            {comment ? (
              <Text className='c-blue-5'>发送</Text>
            ) : (
              <Text className='c-blue-3'>发送</Text>
            )}
          </View>
        </View>

        {/* 底部表情栏 */}
        <View className='mt-4 flex items-center gap-5'>
          {/* 左侧 */}
          <View className='grow w-0 flex items-center gap-3'>
            <SmileOutlined size={20} />
            <SmileOutlined size={20} />
            <SmileOutlined size={20} />
          </View>
          {/* 右侧 */}
          <Location className='shrink-0' size={20} />
          <Photo className='shrink-0' size={20} />
          <Smile className='shrink-0' size={20} />
        </View>
      </View>
    </Popup>
  );
}

function CommentInputBar(props: {
  replyingId: string;
  placeHolder: string;
  onSend: (content: string) => void;
  onClick: () => void;
}) {
  const [value, setValue] = useState("");

  return (
    <Flex
      className='fixed left-0 right-0 bottom-0 b-t-1 b-t-solid b-t-gray-3 py-2 bg-white z-10'
      align='center'
      gutter={8}
      onClick={(e) => {
        props.onClick();
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <Flex.Item span={3}>
        <Button
          color='info'
          shape='round'
          size='small'
          variant='text'
          block
          onClick={() => props.onSend(value)}
        >
          <ArrowDown size={16} />
        </Button>
      </Flex.Item>
      <Flex.Item span={17}>
        <Input
          placeholder={props.placeHolder || "请输入评论"}
          value={value}
          onChange={(e) => setValue(e.detail.value)}
        />
      </Flex.Item>
      <Flex.Item span={4}>
        <Button color='primary' shape='round' size='small' block>
          <Share size={16} />
        </Button>
      </Flex.Item>
    </Flex>
  );
}

function Index() {
  const { id } = Taro.getCurrentInstance().router?.params as { id: string };
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<PostComment[]>([]);

  useEffect(() => {
    Taro.showLoading({ title: "加载中..." });
    const postPromise = getPostsById(id);
    const commentsPromise = getPostCommentsByPostId(id);
    Promise.all([postPromise, commentsPromise]).then(
      ([postRes, commentsRes]) => {
        setPost(postRes!);
        setComments(commentsRes!);
        Taro.hideLoading();
      }
    );
  }, [id]);

  return (
    <View className='h-full px-3 bg-white border-box of-auto'>
      {post && <PageContent post={post} comments={comments} />}
    </View>
  );
}

export default Index;
