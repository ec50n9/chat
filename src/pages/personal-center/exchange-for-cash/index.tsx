import { Popup } from "@taroify/core";
import { InfoOutlined } from "@taroify/icons";
import { Text, View } from "@tarojs/components";
import { useState } from "react";

const Index = () => {
  const [opened, setOpened] = useState(false);
  const [amount, setAmount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const handleExchange = () => {
    if (amount <= 0) {
      return;
    }

    console.log("兑换");
  };

  return (
    <View>
      {/* header */}
      <View className='p-3 flex justify-around items-center b-y-solid b-1 b-gray-3'>
        <View className='flex flex-col gap-1'>
          <View className='c-gray-4'>瓜子</View>
          <View>1000</View>
        </View>
        <View className='flex flex-col gap-1'>
          <View className='c-gray-4'>金币</View>
          <View>100</View>
        </View>
        <View className='flex flex-col gap-1'>
          <View className='c-gray-4'>热度值</View>
          <View className='px-2 py-1 bg-red-5 text-xs c-white rd-1'>
            {opened ? "已" : "未"}开通
          </View>
        </View>
      </View>

      {/* 规则 */}
      <View className='p-3 flex justify-between text-sm c-gray-4'>
        <View>10000瓜子 = 1RMB</View>
        <View
          className='flex items-center gap-1'
          onClick={() => setShowPopup(true)}
        >
          <Text>规则</Text>
          <InfoOutlined />
        </View>
      </View>

      {/* 兑换 */}
      <View className='mx-3 p-3 flex justify-between items-center b-solid b-1 b-gray-3 rd-3'>
        <View>
          当前课兑换现金：<Text className='c-red-5'>{amount}</Text>
        </View>
        <View
          className='px-3 py-1 bg-red-5 text-sm c-white rd-2'
          onClick={handleExchange}
        >
          兑换
        </View>
      </View>

      {/* 规则弹窗 */}
      <Popup open={showPopup} onClose={() => setShowPopup(false)} rounded>
        <View className='p-3'>
          <View className='text-center c-gray-7'>兑换规则</View>
          <View className='mt-3 text-sm c-gray-7'>
            这是规则这是规则这是规则这是规则这是规则这是规则这是规则这是规则
          </View>
        </View>
      </Popup>
    </View>
  );
};

export default Index;
