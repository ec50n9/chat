import { Popup } from "@taroify/core";
import { InfoOutlined } from "@taroify/icons";
import { Text, View } from "@tarojs/components";
import { useState } from "react";

const Statistics = () => {
  const [showPopup, setShowPopup] = useState(false);

  const lastMonth = {
    hot: "700",
    rank: "50%",
    income: "130RMB",
  };
  const thisMonth = {
    hot: "1000",
    rank: "50%",
    income: "130RMB",
  };

  return (
    <View className='m-3 p-3 b-solid b-1 b-gray-3 rd-3'>
      <View
        className='mb-3 flex justify-center items-center gap-2 c-gray-7'
        onClick={() => setShowPopup(true)}
      >
        <Text className='text-lg'>创作总热度值收益</Text>
        <InfoOutlined />
      </View>
      <View className='flex gap-3'>
        {/* 上月 */}
        <View className='grow p-2 flex flex-col gap-2 bg-amber-1 c-gray-7 rd-2'>
          <View className='flex justify-between items-center'>
            <View className='text-sm'>上月热度值</View>
            <View className='c-amber-7'>{lastMonth.hot}</View>
          </View>
          <View className='flex justify-between items-center'>
            <View className='text-sm'>上月排行</View>
            <View>{lastMonth.rank}</View>
          </View>
          <View className='flex justify-between items-center'>
            <View className='text-sm'>上月收益</View>
            <View>{lastMonth.income}</View>
          </View>
        </View>
        {/* 本月 */}
        <View className='grow p-2 flex flex-col gap-2 bg-emerald-1 c-gray-7 rd-2'>
          <View className='grow flex justify-between items-center'>
            <View className='text-sm'>本月热度值</View>
            <View className='c-emerald-7'>{thisMonth.hot}</View>
          </View>
          <View className='flex justify-between items-center'>
            <View className='text-sm'>本月排行</View>
            <View>{thisMonth.rank}</View>
          </View>
          <View className='flex justify-between items-center'>
            <View className='text-sm'>本月收益</View>
            <View>{thisMonth.income}</View>
          </View>
        </View>
      </View>

      <View className='mt-3 text-center c-gray-4 text-sm'>
        每月1号创作收益结算，热度值排行榜越高收益越高！
      </View>

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

      {/* 统计 */}
      <Statistics />

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
