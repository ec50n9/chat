import { View } from "@tarojs/components";
import './index.scss'

export function Ellipsis(props: { content: string; name: string }) {
  const { content } = props;

  return (
    <View className='ellipsis-wrapper flex p-2 of-hidden'>
      <input id={props.name} className='exp' type='checkbox' />
      <View className='text'>
        <label className='btn text-sm' htmlFor={props.name}></label>
        <View>{content}</View>
      </View>
    </View>
  );
}