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
} from "@taroify/icons";
import "@taroify/icons/index.scss";
import { Flex, Input, Button, Empty } from "@taroify/core";
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
}) {
  const { comment, childrenList } = props;
  return (
    <View className='flex gap-2'>
      {/* 评论者头像 */}
      <Image
        className='w-56 h-56 b-2 b-solid b-gray-3 rd-full of-hidden'
        src={comment.sendUser.avatar}
      />
      <View className='grow pb-3 b-b-2 b-b-solid b-b-gray-3'>
        {/* 评论者昵称 */}
        <View className='c-gray-4'>{comment.sendUser.name}</View>
        {/* 评论内容 */}
        <View className='mt-1'>
          {comment.content} <Text className='inline-block c-gray-4'>回复</Text>
        </View>
        {/* 子评论 */}
        <View className='mt-2 flex flex-col gap-2'>
          {childrenList?.map((children) => (
            <View key={children.id} className='flex gap-2'>
              {/* 评论者头像 */}
              <Image
                className='w-56 h-56 b-2 b-solid b-gray-3 rd-full of-hidden'
                src={children.sendUser.avatar}
              />
              <View>
                <View>
                  <Text className='c-gray-4'>{children.sendUser.name}</Text>{" "}
                  回复{" "}
                  <Text className='c-gray-4'>{children.replyUser?.name}</Text>
                </View>
                <View className='mt-1'>
                  {children.content} <Text className='inline-block c-gray-4'>回复</Text>
                </View>
              </View>
            </View>
          ))}
          <View className='text-sm c-gray-4'>展开更多</View>
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
            />
          ))}
        </View>
      ) : (
        <Empty>
          <Empty.Image />
          <Empty.Description>暂无评论</Empty.Description>
        </Empty>
      )}
      <CommentInputBar onSend={() => {}} />
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

function CommentInputBar(props: { onSend: (content: string) => void }) {
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
          placeholder='请输入评论'
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
