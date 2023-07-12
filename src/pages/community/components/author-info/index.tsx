import { View, Image } from "@tarojs/components";
import { Plus } from "@taroify/icons";
import "@taroify/icons/index.scss";
import "./index.scss";
import { Flex } from "@taroify/core";

type Author = {
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
  return (
    <View className='post-item__header'>
      <View className='post-item__header__avatar'>
        <Image src={props.avatar} />
      </View>

      <View className='post-item__header__info'>
        <View className='post-item__header__info__name'>{props.name}</View>
        <View className='post-item__header__info__desc'>
          {timestampToTime(props.timestamp)}
        </View>
      </View>

      {props.showFollowed && (
        <Flex direction='column' align='center'>
          <View className='post-item__header__follow'>
            <Plus />
            关注
          </View>
          <View className='post-item__header__follow post-item__header__follow--silent'>
            <Plus />
            默默支持
          </View>
        </Flex>
      )}
    </View>
  );
}

export default Index;
