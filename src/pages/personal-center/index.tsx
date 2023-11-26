import { Avatar } from "@taroify/core";
import { Arrow, ClosedEye, DiamondOutlined, EyeOutlined } from "@taroify/icons";
import { View, Text } from "@tarojs/components";
import { useState } from "react";

export default function Index() {
  return (
    <View className='min-h-screen flex flex-col gap-3 p-3 bg-gray-1'>
      <UserInfo
        username='本人用户名'
        avatar='https://joeschmoe.io/api/v1/random'
        isRealName
        level='用户'
        totalAssets={100000}
        hotCount={100}
        seedsBalance={100}
        wechatBalance={100}
        alipayBalance={100}
      />
      <Tips />
    </View>
  );
}

function UserInfo(props: {
  username: string;
  avatar: string;
  isRealName?: boolean;
  isQualityCreator?: boolean;
  level: string;
  totalAssets: number;
  hotCount: number;
  seedsBalance: number;
  wechatBalance: number;
  alipayBalance: number;
}) {
  const blanceVisible = useState(false);

  return (
    <View className='p-3 bg-white c-gray-7 rd-3'>
      {/* 用户名栏 */}
      <View className='flex items-center gap-3'>
        <Avatar className='shrink-0' src={props.avatar} />
        <View className='basis-0 grow'>
          <View>{props.username}</View>
          <View className='inline-block mt-1 text-xs bg-red-5 c-white px-2 py-1 rd-2'>
            {props.level}
          </View>
        </View>
        <View className='shrink-0 self-start bg-gray-1 text-sm px-2 py-1 rd-2'>
          {props.isRealName ? "已实名" : "未实名"}
        </View>
      </View>

      {/* 资产栏 */}
      <View className='py-3 b-b-solid b-1 b-gray-3'>
        <View className='flex items-center gap-1 c-gray-4'>
          总资产(元)
          {blanceVisible ? <EyeOutlined /> : <ClosedEye />}
        </View>
        <View className='mt-1 flex justify-between items-center gap-3'>
          <View className='text-lg'>{props.totalAssets}</View>
          <Arrow />
        </View>
      </View>

      {/* 热度栏 */}
      <View className='pt-3 flex justify-around items-start'>
        <View className='flex flex-col items-center gap-1'>
          <Text>瓜子</Text>
          <Text>{props.seedsBalance}</Text>
        </View>
        <View className='flex flex-col items-center gap-1'>
          <Text>热度值</Text>
          {props.isQualityCreator ? (
            <Text>{props.hotCount}</Text>
          ) : (
            <View className='inline-block text-xs bg-red-5 c-white px-2 py-1 rd-2'>
              未开通
            </View>
          )}
        </View>
        <View className='flex flex-col items-center gap-1'>
          <Text>微信</Text>
          <Text>{props.wechatBalance}</Text>
        </View>
        <View className='flex flex-col items-center gap-1'>
          <Text>支付宝</Text>
          <Text>{props.alipayBalance}</Text>
        </View>
      </View>
    </View>
  );
}

function Tips() {
  return (
    <View className='p-3 flex items-center gap-3 bg-white c-gray-7 rd-3'>
      <View className='basis-0 grow'>
        <View className='flex items-center gap-2'>
          <View className='flex items-center gap-1'>
            <DiamondOutlined size='20' />
            <Text>用户</Text>
          </View>
          <View className='w-2 h-30 bg-gray-3'></View>
          <Text className='text-sm c-gray-4'>每日签到获取瓜子</Text>
        </View>
        <View className='mt-1 text-xs c-gray-4'>
          成为优质创作者解锁热度值，现金赢不停。
        </View>
      </View>
      <View className='shrink-0 px-2 py-1 bg-red-5 c-white text-sm rd-2'>
        兑换现金
      </View>
    </View>
  );
}
