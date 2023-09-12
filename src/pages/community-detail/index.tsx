import { View, Image, Text } from "@tarojs/components";
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
} from "@taroify/icons";
import "@taroify/icons/index.scss";
import { Flex, Input, Button, Empty } from "@taroify/core";
import dayjs from "dayjs";
import AuthInfo from "../../components/author-info";
import {
  Post,
  PostComment,
  getPostCommentsByPostId,
  getPostsById,
} from "../community/api";

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
        className='w-56 h-56 b-2 b-solid b-gray-3 rd-full of-hidden'
        src={comment.sendUser.avatar}
      />
      <View className='grow pb-3 b-b-2 b-b-solid b-b-gray-3'>
        {/* 评论者昵称 */}
        <View className='c-gray-4 text-sm'>{comment.sendUser.name}</View>
        {/* 评论内容 */}
        <View
          className='mt-1'
          onClick={() => onReply(comment.id, comment.sendUser.name)}
        >
          {comment.content}
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
              <View key={children.id} className='flex gap-2'>
                {/* 子评论评论者头像 */}
                <Image
                  className='w-40 h-40 b-2 b-solid b-gray-3 rd-full of-hidden'
                  src={children.sendUser.avatar}
                />
                <View className='grow'>
                  {/* 子评论用户名 */}
                  <View className='text-sm'>
                    <Text className='c-gray-4'>{children.sendUser.name}</Text>{" "}
                    回复{" "}
                    <Text className='c-gray-4'>{children.replyUser?.name}</Text>
                  </View>
                  {/* 子评论内容 */}
                  <View
                    className='mt-1'
                    onClick={() => onReply(children.id, children.sendUser.name)}
                  >
                    {children.content}
                  </View>
                  {/* 日期和地区 */}
                  <View className='my-1 flex gap-3 text-sm c-gray-4'>
                    <Text>{dayjs(children.createdAt).format("MM-DD")}</Text>
                    <Text>{children.ipLocation}</Text>
                    {/* 点赞 */}
                    <View className='grow flex justify-end gap-4'>
                      <Text className='flex gap-1 items-center'>
                        <ChatOutlined size={18} />
                        {children.commentCount}
                      </Text>
                      <Text className='flex gap-1 items-center'>
                        {children.liked ? (
                          <Like size={18} />
                        ) : (
                          <LikeOutlined size={18} />
                        )}
                        {children.likeCount}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
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

  const handleReply = (
    id: PostComment["id"],
    nickname: PostComment["sendUser"]["name"]
  ) => {
    setReplyingId(id);
    setPlaceHolder(`回复 ${nickname}`);
  };

  const handleLoadMore = (id: PostComment["id"]) => {
    console.log("loading: ", id);
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
        onSend={() => {}}
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
      <CommentList comments={comments} />
    </View>
  );
}

function CommentInputBar(props: {
  replyingId: string;
  placeHolder: string;
  onSend: (content: string) => void;
}) {
  const [value, setValue] = useState("");

  return (
    <Flex
      className='fixed left-0 right-0 bottom-0 b-t-1 b-t-solid b-t-gray-3 py-2 bg-white z-10'
      align='center'
      gutter={8}
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
        <Button
          color='primary'
          shape='round'
          size='small'
          block
          onClick={() => props.onSend(value)}
        >
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
