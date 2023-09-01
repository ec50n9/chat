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
import AuthInfo from "../../components/author-info";
import {
  Post,
  PostComment,
  getPostCommentsByPostId,
  getPostsById,
} from "../community/api";
import "./index.scss";
import { Field, FixedView, Flex, Input } from "@taroify/core";
import Button from "@taroify/core/button/button";

function PostContent(props: { content: string }) {
  const { content } = props;
  return (
    <View className='post-content'>
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
    <View className='post-actions'>
      {actions.map((action, index) => (
        <View
          key={index}
          className='post-actions__item'
          onClick={action.onClick}
        >
          {action.icon}
          <View className='post-actions__item__text'>{action.text}</View>
        </View>
      ))}
    </View>
  );
}

function Comment(props: { comment: PostComment }) {
  const { comment } = props;
  return (
    <View className='comment-item'>
      <AuthInfo
        name={comment.author.name}
        avatar={comment.author.avatar}
        timestamp={comment.createdAt}
      />
      <View className='comment-item__content'>{comment.content}</View>
    </View>
  );
}

function CommentList(props: { comments: PostComment[] }) {
  const { comments } = props;
  return (
    <View className='comment-list-wrapper'>
      <View className='comment-list__header'>
        <View className='comment-list__header__title'>评论</View>
        <View className='comment-list__header__count'>
          {comments.length} 条
        </View>
      </View>
      <CommentInputBar onSend={() => {}} />
      <View className='comment-list'>
        {comments.map((comment) => (
          <Comment comment={comment} key={comment.id} />
        ))}
      </View>
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
      align='center'
      gutter={8}
      style={{
        padding: "8px 0",
        borderBottom: "1px solid #eee",
        marginBottom: "8px",
        backgroundColor: "#fff",
        zIndex: 100,
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
    <View className='community-detail-page'>
      {post && <PageContent post={post} comments={comments} />}
    </View>
  );
}

export default Index;
