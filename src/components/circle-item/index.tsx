import { View } from "@tarojs/components";
import { Circle } from "../../api";

export default function CircleItem(props: { circle: Circle }) {
  return (
    <View className='flex gap-3 bg-white p-3 rd-3'>
      <View className='shrink-0 w-80 h-80 bg-[#e76038] rd-2'></View>
      <View className='grow flex flex-col gap-1'>
        <View className='flex justify-between items-center'>
          <View className='text-base'>{props.circle.name}</View>
          <View className='shrink-0 text-sm py-0 px-3 rd-full b-3 b-solid b-[#e76038] c-[#e76038]'>加入</View>
        </View>
        <View className='flex justify-between text-sm c-gray-5'>
          <View className=''>123 加入</View>
          <View className=''>123 阅读</View>
        </View>
      </View>
    </View>
  );
}
