import { View } from "@tarojs/components";
import { Dialog } from "@taroify/core";
import { InfoOutlined } from "@taroify/icons";
import CreatorDataCard from "../../components/creator-data-card";

const IncomeCard = (props: {
  seed: number;
  income: number;
  hot: number;
  redPacket: number;
}) => {
  const views = [
    {
      label: "瓜子",
      value: props.seed,
    },
    {
      label: "现金",
      value: props.income,
    },
    {
      label: "热度值",
      value: props.hot,
    },
    {
      label: "红包",
      value: props.redPacket,
    },
  ];

  const showInfo = () => {
    Dialog.alert("这里是收益与打赏的提示");
  };

  return (
    <View className='mt-3 bg-white b-1 b-solid b-gray-3 rd-3'>
      <View className='px-5 pt-3 flex justify-between items-center'>
        <View className='text-lg'>
          收益与打赏
          <InfoOutlined className='ml-1 text-sm' onClick={showInfo} />
        </View>

        <View className='px-3 py-1 text-sm bg-blue-5 c-white rd-1'>明细</View>
      </View>

      <View className='flex justify-around'>
        {views.map((item, i) => (
          <View key={i} className='py-3 flex flex-col items-center gap-1'>
            <View className='c-gray-4'>{item.label}</View>
            <View>{item.value}</View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default function Index() {
  return (
    <View className='min-h-screen bg-gradient-to-br from-lime-2 to-emerald-2 py-3 px-3 box-border bg-gray-1'>
      <CreatorDataCard
        avatar='https://joeschmoe.io/api/v1/random'
        nickname='李世民'
        days={1}
      />
      <IncomeCard seed={194} income={100} hot={100} redPacket={100} />
      <Dialog id='dialog' />
    </View>
  );
}
