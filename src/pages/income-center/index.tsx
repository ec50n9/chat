import { View, Text } from "@tarojs/components";

export default function Index() {
  return (
    <View className='min-h-screen p-3 box-border bg-gray-1 c-gray-7'>
      <MainCard total={0} yesterday={0} settling={0} frozen={0} />
    </View>
  );
}

function MainCard(props: {
  total: number;
  yesterday: number;
  settling: number;
  frozen: number;
}) {
  return (
    <View className='p-3 bg-white rd-3'>
      <View className='pb-3 b-b-solid b-1 b-gray-3'>
        <Text>总收入</Text>
      </View>

      <View className='py-3 flex flex-col items-center gap-1'>
        <View className='flex items-end gap-1'>
          <Text className='text-base'>¥</Text>
          <Text className='text-3xl'>{props.total.toFixed(2)}</Text>
        </View>
        <View className='flex items-center gap-1'>
          <Text className='c-gray-4'>昨天收入</Text>
          <Text className='c-red-5'>+ ¥ {props.yesterday.toFixed(2)}</Text>
        </View>
      </View>

      <View className='px-5 flex justify-between'>
        <View className='flex flex-col items-center gap-1'>
          <View className='text-2xl'>+ {props.settling.toFixed(2)}</View>
          <View className='text-sm c-gray-4'>结算中</View>
        </View>

        <View className='flex flex-col items-center gap-1'>
          <View className='text-2xl'>+ {props.frozen.toFixed(2)}</View>
          <View className='text-sm c-gray-4'>已冻结</View>
        </View>
      </View>

      <View className='mx-3 mt-5 py-2 flex justify-center b-solid b-1 b-gray-3 rd-2 active:bg-gray-3'>
        申请提现
      </View>
      <View className='px-3 pt-2 text-xs c-gray-4'>
        每月1-5号有一次体现机会，10.00元起可提现
        <Text className='inlin-block ml-1 c-blue-4'>提现规则</Text>
      </View>
    </View>
  );
}
