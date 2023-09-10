import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect, useState } from "react";
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

function Comment(props: { comment: PostComment }) {
  const { comment } = props;
  return (
    <View className='flex flex-col bg-white rd-3'>
      <AuthInfo
        name={comment.author.name}
        avatar={comment.author.avatar}
        timestamp={comment.createdAt}
      />
      <View className='mt-1 ml-12 text-base'>{comment.content}</View>
    </View>
  );
}

function CommentList(props: { comments: PostComment[] }) {
  const { comments } = props;
  return (
    <View className='pb-15'>
      <View className='flex justify-between items-center mb-3'>
        <View className='text-xl'>评论</View>
        <View className='text-base c-gray-4'>{comments.length} 条</View>
      </View>
      <CommentInputBar onSend={() => {}} />
      {comments?.length ? (
        <View className='flex flex-col gap-3'>
          {comments.map((comment) => (
            <Comment comment={comment} key={comment.id} />
          ))}
        </View>
      ) : (
        <Empty>
          <Empty.Image />
          <Empty.Description>暂无评论</Empty.Description>
        </Empty>
      )}
    </View>
  );
}

function PageContent(props: { post: Post; comments: PostComment[] }) {
  const { post, comments } = props;

  return (
    <View>
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
    <View className='h-full p-3 bg-white border-box of-auto'>
      {post && <PageContent post={post} comments={comments} />}
    </View>
  );
}

export default Index;
