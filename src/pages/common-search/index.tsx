import { Toast, Search, Tabs, Image } from "@taroify/core";
import { View } from "@tarojs/components";
import { useState } from "react";
import { CommentOutlined, LikeOutlined, StarOutlined } from "@taroify/icons";
import AuthorInfo from "../../components/author-info";

function SearchBar() {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  return (
    <>
      <Toast open={open} onClose={() => setOpen(false)}>
        搜索
      </Toast>
      <Search
        value={value}
        placeholder='请输入搜索关键词'
        action={<View onClick={() => setOpen(true)}>搜索</View>}
        onChange={(e) => setValue(e.detail.value)}
      />
    </>
  );
}

function ResultItem(props: { data: any }) {
  const { data } = props;

  return (
    <View className='bg-white m-3 p-3 rounded-3'>
      {/* 作者 */}
      <AuthorInfo
        id={data.author.id}
        avatar={data.author.avatar}
        name={data.author.name}
        timestamp={data.author.timestamp}
        showFollowed
      />
      {/* 内容 */}
      <View className='mt-3'>{data.content}</View>
      {/* 图片 */}
      <View className='mt-3 flex h-sm justify-between gap-3'>
        {data.imgs.map((img, index) => (
          <Image
            key={index}
            className='h-full rounded-2 overflow-hidden'
            mode='aspectFill'
            src={img}
          />
        ))}
      </View>
      {/* 点赞、评论、收藏 */}
      <View className='mt-3 flex'>
        <View className='flex-grow center gap-2'>
          <StarOutlined size={20} />
          <View>10</View>
        </View>
        <View className='flex-grow center gap-2'>
          <CommentOutlined size={20} />
          <View>10</View>
        </View>
        <View className='flex-grow center gap-2'>
          <LikeOutlined size={20} />
          <View>10</View>
        </View>
      </View>
      {/* 分割线 */}
      <View className='mt-2 mb-3 h-1 bg-gray-2' />
      {/* 圈子 */}
      <View className='flex gap-3 flex-wrap'>
        {data.circles.map((circle, index) => (
          <View key={index} className='bg-gray-2 rounded-2 text-sm py-1 px-3'>
            {circle}
          </View>
        ))}
      </View>
    </View>
  );
}

function ResultList() {
  const dataList = [
    {
      content: "这是一段内容。",
      imgs: [
        "https://img.yzcdn.cn/vant/cat.jpeg",
        "https://img.yzcdn.cn/vant/cat.jpeg",
        "https://img.yzcdn.cn/vant/cat.jpeg",
      ],
      circles: ["圈子1", "圈子2", "圈子3"],
      author: {
        id: "1",
        avatar: "https://avatars.githubusercontent.com/u/17550294?v=4",
        name: "小明",
        timestamp: Date.now(),
      },
    },
    {
      content: "这是一段内容。",
      imgs: [
        "https://img.yzcdn.cn/vant/cat.jpeg",
        "https://img.yzcdn.cn/vant/cat.jpeg",
        "https://img.yzcdn.cn/vant/cat.jpeg",
      ],
      circles: ["圈子1", "圈子2", "圈子3"],
      author: {
        id: "1",
        avatar: "https://avatars.githubusercontent.com/u/17550294?v=4",
        name: "小明",
        timestamp: Date.now(),
      },
    },
  ];

  return (
    <View>
      {dataList.map((data, index) => (
        <ResultItem key={index} data={data} />
      ))}
    </View>
  );
}

function TabBar() {
  const [value, setValue] = useState(0);
  return (
    <Tabs value={value} onChange={setValue}>
      <Tabs.TabPane title='全部'>
        <ResultList />
      </Tabs.TabPane>
      <Tabs.TabPane title='圈子'>内容 2</Tabs.TabPane>
      <Tabs.TabPane title='内容'>内容 3</Tabs.TabPane>
      <Tabs.TabPane title='文章'>内容 4</Tabs.TabPane>
      <Tabs.TabPane title='视频'>内容 4</Tabs.TabPane>
    </Tabs>
  );
}

export default function Index() {
  return (
    <View className='h-screen overflow-scroll text-base bg-gray-1'>
      <SearchBar />
      <TabBar />
    </View>
  );
}
