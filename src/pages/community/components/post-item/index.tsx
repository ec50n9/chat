import { Share, Like, Comment } from "@taroify/icons";
import { View, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useState, useEffect } from "react";
import { Post } from "../../api";
import AuthorInfo from "../author-info";

// 文章圈子列表
function PostItemCircles(props: { circles: string[] }) {
  let circles = props.circles;
  if (!circles || !circles.length) circles = ["漂流者"];
  return (
    <View className='flex flex-wrap gap-3 pt-3 c-gray-7 b-t-1 b-t-solid b-t-gray-2'>
      {circles.map((circle) => (
        <View className='text-xs py-1.5 px-3 bg-gray-2 rd-full' key={circle}>
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
    <View className='flex justify-around gap-3 c-gray-5'>
      {props.actions.map((action) => (
        <View className='flex items-center gap-3 py-1' key={action.text}>
          {action.icon}
          <View className='text-xs'>{action.text}</View>
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
    <View className='flex flex-col gap-3 p-3 bg-white rd-3 shadow' onClick={gotoDetail}>
      <AuthorInfo {...props.post.author} timestamp={props.post.createdAt} showFollowed />

      <View className='text-sm leading-normal'>
        {content}
        {lineCount > 3 ? (
          <>
            {expanded ? "" : "... "}
            <View className='inline-block c-[#e76038]' onClick={handleExpand}>
              {expanded ? "收起" : "展开"}
            </View>
          </>
        ) : (
          ""
        )}
      </View>

      <View className='grid grid-cols-3 gap-2'>
        {props.post.images?.map((image, index) => (
          <Image
            className='w-full h-full object-cover rd-3'
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