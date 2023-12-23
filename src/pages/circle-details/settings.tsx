import { Avatar, Button, Cell, Popup } from "@taroify/core";
import CellGroup from "@taroify/core/cell/cell-group";
import { Arrow, Qr } from "@taroify/icons";
import { View, Text, Input } from "@tarojs/components";
import { useState } from "react";

const Header = (props: { avatar: string; name: string }) => {
  return (
    <View className='py-5 flex flex-col items-center gap-1'>
      <Avatar className='b-3 b-solid b-red-3' src={props.avatar} size='large' />
      <View>{props.name}</View>
    </View>
  );
};

const CircleInfoBar = (props: { name: string; id: string }) => {
  const handleShare = () => {
    // 这里执行分享操作
  };

  return (
    <View className='flex flex-col items-center gap-1'>
      <View className='text-xl'>{props.name}</View>
      <View className='text-sm c-gray-4'>圈子号：{props.id}</View>
      <View
        className='mt-3 px-3 py-1 flex items-center gap-2 c-red-4 bg-white b-3 b-solid b-red-4 rd-3'
        onClick={handleShare}
      >
        <Qr size={24} />
        <Text className='text-sm'>分享圈子</Text>
      </View>
    </View>
  );
};

const EditCircleFullName = (props: {
  name: string;
  onCancel: () => void;
  onUpdate: (name: string) => void;
}) => {
  const [value, setValue] = useState(props.name);

  return (
    <View>
      <View className='text-lg c-gray-7 mb-3'>编辑圈子全称</View>
      <Input
        className='px-3 py-2 b-3 b-solid b-gray-3 rd-2'
        placeholder='请输入圈子全称'
        value={value}
        onInput={(e) => setValue(e.detail.value)}
      />
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

const EditCircleShortName = (props: {
  name: string;
  onCancel: () => void;
  onUpdate: (name: string) => void;
}) => {
  const [value, setValue] = useState(props.name);

  return (
    <View>
      <View className='text-lg c-gray-7 mb-3'>编辑圈子简称</View>
      <Input
        className='px-3 py-2 b-3 b-solid b-gray-3 rd-2'
        placeholder='请输入圈子简称'
        value={value}
        onInput={(e) => setValue(e.detail.value)}
      />
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

const SettingsPanel = () => {
  const [currentPopup, setCurrentPopup] = useState<string | null>(null);

  return (
    <View className='py-5'>
      <CellGroup>
        <Cell
          title='圈子全称'
          rightIcon={<Arrow className='flex!' size={18} />}
          clickable
          onClick={() => setCurrentPopup("circle-fullname")}
        />
        <Cell
          title='圈子简称'
          rightIcon={<Arrow className='flex!' size={18} />}
          clickable
          onClick={() => setCurrentPopup("circle-shortname")}
        />
        <Cell
          title='圈子成员'
          rightIcon={<Arrow className='flex!' size={18} />}
          clickable
          onClick={() => setCurrentPopup("circle-members")}
        />
        <Cell
          title='圈子介绍'
          rightIcon={<Arrow className='flex!' size={18} />}
          clickable
          onClick={() => setCurrentPopup("circle-intro")}
        />
      </CellGroup>

      <CellGroup className='mt-3'>
        <Cell
          title='标签管理'
          rightIcon={<Arrow className='flex!' size={18} />}
          clickable
        />
        <Cell
          title='入圈申请'
          rightIcon={<Arrow className='flex!' size={18} />}
          clickable
        />
      </CellGroup>

      <CellGroup className='mt-3'>
        <Cell clickable>
          <Text className='c-red-5'>退出圈子</Text>
        </Cell>
      </CellGroup>

      <Popup
        placement='bottom'
        className='h-3/5'
        open={!!currentPopup}
        onClose={() => setCurrentPopup(null)}
      >
        <View className='p-3'>
          {
            {
              "circle-fullname": (
                <EditCircleFullName
                  name='广州大学校友圈'
                  onCancel={() => setCurrentPopup(null)}
                  onUpdate={() => {}}
                />
              ),
              "circle-shortname": (
                <EditCircleShortName
                  name='校友'
                  onCancel={() => setCurrentPopup(null)}
                  onUpdate={() => {}}
                />
              ),
            }[currentPopup]
          }
        </View>
      </Popup>
    </View>
  );
};

export default function Index() {
  return (
    <View className='min-h-screen bg-gray-1'>
      <Header avatar='https://img01.yzcdn.cn/vant/cat.jpeg' name='陈霸先' />
      <CircleInfoBar name='广州大学校友圈' id='784874' />
      <SettingsPanel />
    </View>
  );
}
