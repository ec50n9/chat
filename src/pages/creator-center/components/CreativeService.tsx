import {
  AppsOutlined,
  BalancePay,
  Contact,
  GemOutlined,
  GiftOutlined,
  SmileCommentOutlined,
} from "@taroify/icons";
import { View } from "@tarojs/components";
import { useRef } from "react";

export default function CreativeService() {
  const serviceList = useRef([
    {
      label: "激励计划",
      icon: <GemOutlined size={24} />,
    },
    {
      label: "激励计划",
      icon: <GiftOutlined size={24} />,
    },
    {
      label: "规则中心",
      icon: <SmileCommentOutlined size={24} />,
    },
    {
      label: "个人账户",
      icon: <BalancePay size={24} />,
    },
    {
      label: "成为开发者",
      icon: <Contact size={24} />,
    },
    {
      label: "更多服务",
      icon: <AppsOutlined size={24} />,
    },
  ]);

  return (
    <View className='mt-3 mx-3 p-3 bg-white rd-3'>
      <View className='text-base'>创作数据</View>
      <View className='mt-2 grid grid-cols-4 gap-y-3'>
        {serviceList.current.map((item, index) => (
          <View key={index} className='pt-2 flex flex-col items-center gap-2'>
            {item.icon}
            <View className='text-sm c-gray-4'>{item.label}</View>
          </View>
        ))}
      </View>
    </View>
  );
}
