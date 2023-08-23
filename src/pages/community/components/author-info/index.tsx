import { View, Image } from "@tarojs/components";
import { Plus } from "@taroify/icons";
import Taro from "@tarojs/taro";
import "@taroify/icons/index.scss";

type Author = {
  id: string;
  name: string;
  avatar: string;
  timestamp: number;
};

function timestampToTime(timestamp: number) {
  const date = new Date(timestamp);
  const Y = date.getFullYear();
  const M =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  const D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  return `${M}-${D}`;
}

function Index(
  props: Author & {
    showFollowed?: boolean;
    followed?: boolean;
    onFollow?: () => void;
  }
) {
  const gotoUserDetails = (e) => {
    console.log("goto user details");
    e.preventDefault();
    e.stopPropagation();
    Taro.navigateTo({
      url: `/pages/user-details/index?id=${props.id ?? "abc"}`,
    });
  };

  return (
    <View className='flex items-center gap-3' onClick={gotoUserDetails}>
      <View className='w-72 h-72 rd-full of-hidden'>
        <Image src={props.avatar} />
      </View>

      <View className='grow'>
        <View>{props.name}</View>
        <View className='c-gray-7 text-xs'>
          {timestampToTime(props.timestamp)}
        </View>
      </View>

      {props.showFollowed && (
        <View className='shrink-0 flex gap-1 items-center justify-center c-[#e76038] b-3 b-solid b-[#e76038] rd-full py-.5 px-2 text-sm'>
          <Plus />
          关注
        </View>
      )}
    </View>
  );
}

export default Index;
