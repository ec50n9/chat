import { Divider, Progress } from "@taroify/core";
import { View } from "@tarojs/components";

type ActivityProps = {
  days: number;
};

const EcProgress = (props: {
  steps: { percent: number; label: string }[];
  percent: number;
  label: string;
}) => {
  return (
    <View className='mt-3 w-full'>
      <View className='relative h-30'>
        {props.steps.map((item, index) => (
          <View
            key={index}
            className='absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 px-2 text-xs bg-orange-3 c-orange-7 rd-1'
            style={{ left: `${item.percent * 100}%` }}
          >
            {item.label}
          </View>
        ))}
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
        steps={[
          { percent: 0.1, label: "10" },
          { percent: 0.2, label: "20" },
          { percent: 0.3, label: "40" },
          { percent: 0.4, label: "80" },
          { percent: 0.6, label: "150" },
          { percent: 0.8, label: "200" },
          { percent: 1, label: "600" },
        ]}
        percent={(props.days / 7) * 100}
        label={`还差 ${7 - props.days} 天`}
      />
      <View className='mt-3 px-4 py-1 text-sm c-white bg-red-5 rd-2'>签到</View>
    </View>
  );
}
