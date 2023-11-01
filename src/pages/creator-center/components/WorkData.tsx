import { View } from "@tarojs/components";
import { useRef } from "react";

type WorkDataProps = {
  fansCount: number;
  collectCount: number;
  likeCount: number;
  commentCount: number;
};

export default function WorkData(props: WorkDataProps) {
  const dataList = useRef([
    {
      label: "粉丝数",
      value: props.fansCount,
    },
    {
      label: "收藏数",
      value: props.collectCount,
    },
    {
      label: "获赞数",
      value: props.likeCount,
    },
    {
      label: "评论数",
      value: props.commentCount,
    },
  ]);

  return (
    <View className='mt-2 mx-3 p-3 bg-white rd-3'>
      <View className='text-base'>创作数据</View>
      <View className='mt-2 flex justify-around'>
        {dataList.current.map((item) => (
          <View key={item.label} className='flex flex-col items-center gap-2'>
            <View>{item.value}</View>
            <View className='text-sm c-gray-4'>{item.label}</View>
          </View>
        ))}
      </View>
    </View>
  );
}
