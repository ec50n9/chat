import { View, Image } from "@tarojs/components";
import { Plus } from "@taroify/icons";
import { Flex } from "@taroify/core";
import Taro from "@tarojs/taro";
import "@taroify/icons/index.scss";
import "./index.scss";

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
    <View className='post-item__header' onClick={gotoUserDetails}>
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
