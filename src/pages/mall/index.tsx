import { Avatar, Button } from "@taroify/core";
import { GemOutlined, VipCardOutlined } from "@taroify/icons";
import { Text, View } from "@tarojs/components";

function Header({
  username,
  avatar,
  isVip,
  vipExpire,
}: {
  username: string;
  avatar: string;
  isVip: boolean;
  vipExpire: Date;
}) {
  const dateStr = `${vipExpire.getFullYear()}-${
    vipExpire.getMonth() + 1
  }-${vipExpire.getDate()} ${vipExpire.getHours()}:${vipExpire.getMinutes()}:${vipExpire.getSeconds()}`;

  return (
    <View className='p-3 flex items-center gap-3'>
      <Avatar src='https://joeschmoe.io/api/v1/random' size='large' />
      <View>
        <View>{username}</View>
        <View className='mt-1 flex gap-3 items-center text-sm'>
          {isVip ? (
            <Text className='bg-gray-9 px-2 py-.5 rd-full text-xs c-white'>
              <VipCardOutlined /> 会员
            </Text>
          ) : (
            <Text className='text-gray-500'>普通用户</Text>
          )}
          <Text>{dateStr} 到期</Text>
        </View>
      </View>
    </View>
  );
}

function Banner() {
  return (
    <View className='flex gap-3 items-center mx-3 mt-3 py-2 px-3 rd-t-3 bg-red-4 c-white'>
      <GemOutlined className='shrink-0' size={24} color='#fde91a' />
      <View className='grow'>
        <View>会员年卡</View>
        <View className='mt-.5 text-sm'>开通后立省 ￥233 元</View>
      </View>
      <View className='shrink-0 px-3 py-1 rd-full bg-amber-3 text-sm c-gray-7'>
        立即开通
      </View>
    </View>
  );
}

function PackageList({ list = [] }: { list: any[] }) {
  return (
    <View>
      <View className='bg-orange-1 px-5 py-3'>优惠套餐</View>
      <View>
        {list.map((item) => (
          <View key={item.id} className='flex items-center gap-3 py-3 px-5'>
            <View className='grow'>
              <View>
                {item.name} - {item.desc}
              </View>
              <View className='text-sm'>
                <Text className='c-red-5'>{item.price / 100} 元</Text>
                <Text className='c-gray-5 line-through ml-2'>
                  {item.originPrice / 100} 元
                </Text>
              </View>
            </View>
            <View className='shrink-0 bg-gray-8 px-3 py-1 text-sm c-white rd-full'>
              立即升级
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

export default function Index() {
  const user = {
    username: "张三",
    avatar: "https://joeschmoe.io/api/v1/random",
    isVip: true,
    vipExpire: new Date(),
  };

  const list = [
    {
      id: 1,
      name: "日卡",
      desc: "gpt 20次",
      price: 990,
      originPrice: 1999,
    },
    {
      id: 2,
      name: "月卡",
      desc: "gpt 100次",
      price: 9900,
      originPrice: 19999,
    },
  ];

  return (
    <View>
      <Header
        username={user.username}
        avatar={user.avatar}
        isVip={user.isVip}
        vipExpire={user.vipExpire}
      />
      <Banner />
      <PackageList list={list} />
    </View>
  );
}
