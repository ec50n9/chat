import { Avatar } from "@taroify/core";
import {
  Comment,
  FireOutlined,
  InfoOutlined,
  Like,
  Star,
} from "@taroify/icons";
import { View } from "@tarojs/components";

const CreatorDataCard = (props: {
  avatar: string;
  nickname: string;
  days: number;
}) => (
  <View className='p-5 flex flex-col bg-white b-1 b-solid b-gray-3 rd-3'>
    <View className='flex justify-between items-center'>
      <View className='flex items-end gap-1'>
        Hi!
        <Avatar src={props.avatar} />
        {props.nickname}
      </View>

      <View className='px-3 py-1 text-sm bg-blue-5 c-white rd-1'>发布</View>
    </View>

    <View className='mt-3 c-gray-4'>
      今天是你成为苦瓜优质创作者的第{props.days}天
    </View>
  </View>
);

const DataCard = (props: {
  pickCount: number;
  articleCount: number;
  videoCount: number;
  charCount: number;
}) => {
  const views = [
    {
      label: "pick",
      value: props.pickCount + "条",
    },
    {
      label: "图文",
      value: props.articleCount + "篇",
    },
    {
      label: "创作",
      value: props.charCount + "字",
    },
    {
      label: "视频",
      value: props.videoCount + "个",
    },
  ];

  return (
    <View className='mt-3 bg-white flex justify-around b-1 b-solid b-gray-3 rd-3'>
      {views.map((item, i) => (
        <View key={i} className='py-3 flex flex-col items-center gap-1'>
          <View className='c-gray-4'>{item.label}</View>
          <View>{item.value}</View>
        </View>
      ))}
    </View>
  );
};

const TipCard = (props: { title: string; desc: string }) => {
  return (
    <View className='mt-3 py-3 px-5 bg-white b-1 b-solid b-gray-3 rd-3'>
      <View className='text-lg'>{props.title}</View>
      <View className='mt-1 flex items-center gap-2 c-gray-4'>
        {props.desc}
        <InfoOutlined />
      </View>
    </View>
  );
};

const HotDataCard = (props: {
  hotNum: number;
  likeCount: number;
  collectCount: number;
  commentCount: number;
}) => {
  const views = [
    {
      label: "点赞",
      icon: <Like color='#94a3b8' />,
      value: props.likeCount,
    },
    {
      label: "收藏",
      icon: <Star color='#94a3b8' />,
      value: props.collectCount,
    },
    {
      label: "评论",
      icon: <Comment color='#94a3b8' />,
      value: props.commentCount,
    },
  ];
  return (
    <View className='mt-3 py-3 px-5 bg-white b-1 b-solid b-gray-3 rd-3'>
      <View className='text-lg'>
        创作数据
        <InfoOutlined />
      </View>

      <View className='mt-1 flex justify-between items-center gap-2'>
        <View className='c-gray-4'>累计热度值</View>
        <View className='flex items-center gap-1'>
          <FireOutlined color='#ef4444' />
          {props.hotNum}
        </View>
      </View>

      <View className='mt-3 p-2 flex justify-around bg-gray-2 rd-2'>
        {views.map((item, i) => (
          <View key={i} className='flex flex-col items-center'>
            <View>{item.value}</View>
            <View className='flex items-center gap-1 text-sm'>
              {item.icon}
              {item.label}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default function Index() {
  return (
    <View className='min-h-screen bg-gradient-to-br from-lime-2 to-emerald-2 py-3 px-3 box-border bg-gray-1'>
      <CreatorDataCard
        avatar='https://joeschmoe.io/api/v1/random'
        nickname='李世民'
        days={1}
      />
      <DataCard
        pickCount={100}
        articleCount={100}
        videoCount={100}
        charCount={100}
      />
      <TipCard
        title='优质的创作，需要时间'
        desc='近一年来，平均每月产出0.5篇产品'
      />
      <HotDataCard
        hotNum={100}
        likeCount={100}
        collectCount={100}
        commentCount={100}
      />
    </View>
  );
}
