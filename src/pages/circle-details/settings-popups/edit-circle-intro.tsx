import { Button } from "@taroify/core";
import { View, Textarea } from "@tarojs/components";
import { useState } from "react";

/** 编辑圈子简介 */
const EditCircleIntro = (props: {
  initValue: string;
  onCancel: () => void;
  onUpdate: (name: string) => void;
}) => {
  const [value, setValue] = useState(props.initValue);

  return (
    <View>
      <View className='text-lg c-gray-7 mb-3'>编辑圈子简介</View>
      <View>
        <Textarea
          className='w-full box-border px-3 py-2 b-3 b-solid b-gray-3 rd-2'
          placeholder='请输入圈子简介'
          value={value}
          onInput={(e) => setValue(e.detail.value)}
        />
      </View>
      <View className='mt-5 flex gap-3'>
        <Button
          variant='outlined'
          shape='round'
          size='medium'
          block
          onClick={props.onCancel}
        >
          取消
        </Button>
        <Button
          color='primary'
          shape='round'
          size='medium'
          block
          onClick={() => props.onUpdate(value)}
        >
          保存
        </Button>
      </View>
    </View>
  );
};

export default EditCircleIntro;
