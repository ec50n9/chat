import { Share, Like, Comment } from "@taroify/icons";
import { View, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useState, useEffect } from "react";
import { Post } from "../../api";
import AuthorInfo from "../author-info";
import './index.scss'

// 文章圈子列表
function PostItemCircles(props: { circles: string[] }) {
  let circles = props.circles;
  if (!circles || !circles.length) circles = ["漂流者"];
  return (
    <View className='post-item__circles'>
      {circles.map((circle) => (
        <View className='post-item__circles__item' key={circle}>
          # {circle}
        </View>
      ))}
    </View>
  );
}

// 获取文章行数
function getLineCount(text: string, count: number) {
  const lines = text.split("\n");
  let lineCount = 0;
  for (const line of lines) {
    lineCount += Math.ceil(line.length / count);
  }
  return lineCount;
}

// 文章底部操作（点赞、分享等）
function PostItemActions(props: {
  actions: { icon: JSX.Element; text: string }[];
}) {
  return (
    <View className='post-item__actions'>
      {props.actions.map((action) => (
        <View className='post-item__actions__item' key={action.text}>
          {action.icon}
          <View className='post-item__actions__item__text'>{action.text}</View>
        </View>
      ))}
    </View>
  );
}

// 文章item
export default function PostItem(props: {post: Post}) {
  // 文章操作相关变量
  const actions = [
    {
      icon: <Share />,
      text: "分享",
    },
    {
      icon: <Comment />,
      text: props.post.commentCount + "",
    },
    {
      icon: <Like />,
      text: props.post.likeCount + "",
    },
  ];

  // 展开/收起 相关变量
  const [expanded, setExpanded] = useState(false);
  const [lineCount] = useState(getLineCount(props.post.content, 20));
  const [content, setContent] = useState(props.post.content);
  useEffect(() => {
    if (expanded) {
      setContent(props.post.content);
    } else {
      setContent(props.post.content.slice(0, 20 * 3));
    }
  }, [expanded, props.post.content]);

  // 展开/收起
  const handleExpand = (e: any) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };

  // 跳转到详情页
  const gotoDetail = () => {
    Taro.navigateTo({
      url: `/pages/community-detail/index?id=${props.post.id}`,
    });
  };

  return (
    <View className='post-item' onClick={gotoDetail}>
      <AuthorInfo {...props.post.author} timestamp={props.post.createdAt} showFollowed />

      <View className='post-item__content'>
        {content}
        {lineCount > 3 ? (
          <>
            {expanded ? "" : "... "}
            <View className='post-item__content__expand' onClick={handleExpand}>
              {expanded ? "收起" : "展开"}
            </View>
          </>
        ) : (
          ""
        )}
      </View>

      <View className='post-item__images'>
        {props.post.images?.map((image, index) => (
          <Image
            className='post-item__images__item'
            src={image}
            key={image + index}
          />
        ))}
      </View>

      <PostItemActions actions={actions} />

      <PostItemCircles circles={props.post.author.circles} />
    </View>
  );
}