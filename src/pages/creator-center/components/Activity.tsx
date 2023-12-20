import { Divider, Progress } from "@taroify/core";
import { View } from "@tarojs/components";

type ActivityProps = {
  days: number;
};

const EcProgress = (props: {
  steps: (number | null)[];
  percent: number;
  label: string;
}) => {
  return (
    <View className='mt-3 w-full'>
      <View className='flex justify-between'>
        {props.steps.map((item, index) =>
          item ? (
            <View
              key={index}
              className='px-2 text-xs bg-orange-3 c-orange-7 rd-1'
            >
              {item}
            </View>
          ) : (
            <View className='w-20'></View>
          )
        )}
      </View>
      <Progress className='mt-1' percent={props.percent} label={props.label} />
    </View>
  );
};

export default function (props: ActivityProps) {
  return (
    <View className='mt-3 mx-3 p-3 flex flex-col items-center bg-white rd-3'>
      <View>每日签到大礼包</View>
      <Divider className='my-1! w-1/2 b-gray-4!'>无限瓜子领不停</Divider>
      <View className='mt-3 text-lg'>已连续签到 {props.days} 天</View>
      <View className='mt-1 text-sm c-gray-4'>连续签到 7 天享受更高奖励</View>
      <EcProgress
        steps={[null, 10, 20, 40, 80, 150, 200, 600]}
        percent={(props.days / 7) * 100}
        label={`还差 ${7 - props.days} 天`}
      />
      <View className='mt-3 px-4 py-1 text-sm c-white bg-red-5 rd-2'>签到</View>
    </View>
  );
}
