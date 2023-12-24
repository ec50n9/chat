import { View, Input } from "@tarojs/components";
import { Button, Popup, Tag } from "@taroify/core";
import { useState } from "react";

const EditCircleTags = (props: {
  initValue: { id: string; name: string }[];
  onCancel: () => void;
  onUpdate: (tags: { id: string; name: string }[]) => void;
}) => {
  const [value, setValue] = useState(props.initValue);

  const [editPopupVisible, setEditPopupVisible] = useState(false);
  const [editingValue, setEditingValue] = useState("");

  const handleAddTag = () => {
    if (editingValue) {
      setValue([...value, { id: Date.now().toString(), name: editingValue }]);
      setEditPopupVisible(false);
      setEditingValue("");
    }
  };

  return (
    <View>
      <View className='text-lg c-gray-7 mb-3'>编辑圈子标签</View>

      <View className='flex flex-wrap gap-2'>
        {value.map((item) => (
          <Tag
            key={item.id}
            color='primary'
            size='large'
            closeable
            onClose={() => setValue(value.filter((i) => i.id !== item.id))}
          >
            {item.name}
          </Tag>
        ))}

        {/* 添加 */}
        <Tag
          color='success'
          size='large'
          onClick={() => setEditPopupVisible(true)}
        >
          添加 +
        </Tag>
      </View>

      {/* 添加新标签的编辑弹窗 */}
      <Popup
        className='w-4/5'
        rounded
        open={editPopupVisible}
        onClose={() => setEditPopupVisible(false)}
      >
        <View className='px-5 py-3'>
          <View className='text-lg c-gray-7 mb-3'>添加标签</View>
          <Input
            className='px-3 py-2 b-3 b-solid b-gray-3 rd-2'
            placeholder='请输入标签名称'
            value={editingValue}
            onInput={(e) => setEditingValue(e.detail.value)}
          />
          <View className='mt-5 flex gap-3'>
            <Button
              variant='outlined'
              shape='round'
              block
              onClick={() => setEditPopupVisible(false)}
            >
              取消
            </Button>
            <Button color='primary' shape='round' block onClick={handleAddTag}>
              保存
            </Button>
          </View>
        </View>
      </Popup>

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

export default EditCircleTags;
