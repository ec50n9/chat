import { Divider } from "@taroify/core";
import { View } from "@tarojs/components";

type ActivityProps = {
  days: number;
};

export default function (props: ActivityProps) {
  return (
    <View className='mt-3 mx-3 p-3 flex flex-col items-center bg-white rd-3'>
      <View>每日签到大礼包</View>
      <Divider className='my-1! w-1/2 b-gray-4!'>无限瓜子领不停</Divider>
      <View className='mt-3 text-lg'>已连续签到 {props.days} 天</View>
      <View className='mt-1 text-sm c-gray-4'>连续签到 7 天享受更高奖励</View>
      <View className='mt-3 px-4 py-1 text-sm c-white bg-red-5 rd-2'>签到</View>
    </View>
  );
}
