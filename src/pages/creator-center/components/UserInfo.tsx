import Avatar from "@taroify/core/avatar/avatar";
import { View } from "@tarojs/components";

type UserInfoProps = {
  username: string;
  avatar: string;
};

export default function UserInfo(props: UserInfoProps) {
  return (
    <View className='px-5 py-3 flex items-center gap-3'>
      <Avatar className='shrink-0' src={props.avatar} size='large' />
      <View className='grow flex flex-col items-start gap-1'>
        <View className='text-base'>{props.username}</View>
        <View className='px-2 py-.5 text-xs c-white bg-red-5 rd-1'>创作者</View>
      </View>
      <View className='self-start px-3 py-1 text-sm c-gray-7 bg-white b-1 b-solid b-gray-3 rd-2'>
        发布
      </View>
    </View>
  );
}
