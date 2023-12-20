import { Avatar } from "@taroify/core";
import { View } from "@tarojs/components";

const CreatorDataCard = (props: {
  avatar: string;
  nickname: string;
  days: number;
  onPublish?: () => void;
}) => (
  <View className='p-5 flex flex-col bg-white b-1 b-solid b-gray-3 rd-3'>
    <View className='flex justify-between items-center'>
      <View className='flex items-end gap-1'>
        Hi!
        <Avatar src={props.avatar} />
        {props.nickname}
      </View>

      <View
        className='px-3 py-1 text-sm bg-blue-5 c-white rd-1'
        onClick={props.onPublish}
      >
        发布
      </View>
    </View>

    <View className='mt-3 c-gray-4'>
      今天是你成为苦瓜优质创作者的第{props.days}天
    </View>
  </View>
);

export default CreatorDataCard;
