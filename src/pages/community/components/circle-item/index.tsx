import { View } from "@tarojs/components";
import { Circle } from "../../api";
import './index.scss'

export default function CircleItem(props: { circle: Circle }) {
  return (
    <View className='circle-item'>
      <View className='circle-item__cover'></View>
      <View className='circle-item__info'>
        <View className='circle-item__top'>
          <View className='circle-item__name'>{props.circle.name}</View>
          <View className='circle-item__follow'>关注</View>
        </View>
        <View className='circle-item__actions'>
          <View className='circle-item__actions__member'>123 加入</View>
          <View className='circle-item__actions__read'>123 阅读</View>
        </View>
      </View>
    </View>
  );
}
