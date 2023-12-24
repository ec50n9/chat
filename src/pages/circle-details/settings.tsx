import { Avatar, Button, Cell, Dialog, Popup } from "@taroify/core";
import CellGroup from "@taroify/core/cell/cell-group";
import { Arrow, Qr } from "@taroify/icons";
import { View, Text } from "@tarojs/components";
import { useState } from "react";

import EditCircleFullName from "./settings-popups/edit-circle-full-name";
import EditCircleShortName from "./settings-popups/edit-circle-short-name";
import EditCircleIntro from "./settings-popups/edit-circle-intro";
import EditCircleTags from "./settings-popups/edit-circle-tags";
import Taro from "@tarojs/taro";

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

const SettingsPanel = () => {
  const [currentPopup, setCurrentPopup] = useState<string | null>(null);

  const [exitCircleDialogVisible, setExitCircleDialogVisible] = useState(false);
  const handleExitCircle = () => {
    // 这里执行退出圈子的逻辑
    console.log("退出圈子");
  };

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
          onClick={() =>
            Taro.navigateTo({ url: "/pages/circle-details/member-manager" })
          }
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
          onClick={() => setCurrentPopup("circle-tags")}
        />
        <Cell
          title='入圈申请'
          rightIcon={<Arrow className='flex!' size={18} />}
          clickable
        />
      </CellGroup>

      <CellGroup className='mt-3'>
        <Cell clickable onClick={() => setExitCircleDialogVisible(true)}>
          <Text className='c-red-5'>退出圈子</Text>
        </Cell>
      </CellGroup>

      {/* 编辑弹窗 */}
      <Popup
        placement='bottom'
        rounded
        className='h-3/5'
        open={!!currentPopup}
        onClose={() => setCurrentPopup(null)}
      >
        <View className='p-3'>
          {currentPopup
            ? {
                "circle-fullname": (
                  <EditCircleFullName
                    initValue='广州大学校友圈'
                    onCancel={() => setCurrentPopup(null)}
                    onUpdate={() => {}}
                  />
                ),
                "circle-shortname": (
                  <EditCircleShortName
                    initValue='校友'
                    onCancel={() => setCurrentPopup(null)}
                    onUpdate={() => {}}
                  />
                ),
                "circle-members": "",
                "circle-intro": (
                  <EditCircleIntro
                    initValue='这是一段简介'
                    onCancel={() => setCurrentPopup(null)}
                    onUpdate={() => {}}
                  />
                ),
                "circle-tags": (
                  <EditCircleTags
                    initValue={[
                      { id: "1", name: "标签1" },
                      { id: "2", name: "标签2" },
                    ]}
                    onCancel={() => setCurrentPopup(null)}
                    onUpdate={() => {}}
                  />
                ),
              }[currentPopup]
            : ""}
        </View>
      </Popup>

      {/* 退出圈子弹窗 */}
      <Dialog
        open={exitCircleDialogVisible}
        onClose={() => setExitCircleDialogVisible(false)}
      >
        <Dialog.Header>退出圈子</Dialog.Header>
        <Dialog.Content>确定要退出该圈子吗？</Dialog.Content>
        <Dialog.Actions>
          <Button onClick={() => setExitCircleDialogVisible(false)}>
            取消
          </Button>
          <Button
            onClick={() => {
              handleExitCircle();
              setExitCircleDialogVisible(false);
            }}
          >
            确认
          </Button>
        </Dialog.Actions>
      </Dialog>
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
