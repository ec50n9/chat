import { Avatar, Dialog, Search } from "@taroify/core";
import { Ellipsis } from "@taroify/icons";
import { Button, View } from "@tarojs/components";
import { useState } from "react";

const SearchBar = () => {
  const [value, setValue] = useState("");
  return (
    <Search
      value={value}
      shape='rounded'
      placeholder='请输入搜索关键词'
      onChange={(e) => setValue(e.detail.value)}
    />
  );
};

const MasterBar = (props: { avatar: string; name: string }) => (
  <View className='px-4 py-3 flex items-center gap-3'>
    <Avatar
      className='shrink-0'
      src={props.avatar}
      size='medium'
      shape='circle'
    />
    <View className='basis-0 grow'>{props.name}</View>
    <View className='shrink-0 c-gray4'>圈主</View>
  </View>
);

const MemberList = (props: {
  memberList: { id: string; avatar: string; name: string; joinDate: number }[];
}) => {
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [currentViewMember, setCurrentViewMember] = useState({
    id: "",
    avatar: "",
    name: "",
    joinDate: Date.now(),
  });
  const handleViewMember = (member: {
    id: string;
    avatar: string;
    name: string;
    joinDate: number;
  }) => {
    setCurrentViewMember(member);
    setEditDialogVisible(true);
  };

  const blockMember = (memberId: string) => {
    // 这里进行拉黑用户
    console.log("拉黑", memberId);
  };

  return (
    <View className='px-4 pt-1 pb-5 c-gray-7'>
      <View className='text-lg c-gray-4'>成员</View>
      <View>
        {props.memberList.map((item) => (
          <View key={item.id} className='py-2 flex items-center gap-3'>
            <Avatar
              className='shrink-0'
              src={item.avatar}
              size='medium'
              shape='circle'
            />
            <View className='basis-0 grow'>{item.name}</View>
            <View className='shrink-0' onClick={() => handleViewMember(item)}>
              <Ellipsis />
            </View>
          </View>
        ))}
      </View>

      {/* 编辑弹窗 */}
      <Dialog open={editDialogVisible} onClose={setEditDialogVisible}>
        <Dialog.Content>
          <View className='flex flex-col items-center gap-2'>
            <Avatar
              src={currentViewMember.avatar}
              size='large'
              shape='circle'
            />
            <View className='text-lg'>{currentViewMember.name}</View>
            <View className='c-gray-4'>
              加入日期：{currentViewMember.joinDate}
            </View>
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onClick={() => setEditDialogVisible(false)}>取消</Button>
          <Button
            onClick={() => {
              blockMember(currentViewMember.id);
              setEditDialogVisible(false);
            }}
          >
            拉黑
          </Button>
        </Dialog.Actions>
      </Dialog>
    </View>
  );
};

export default function Index() {
  const [memberList, setMemberList] = useState([
    {
      id: "1",
      avatar: "https://img.yzcdn.cn/vant/cat.jpeg",
      name: "张三",
      joinDate: Date.now(),
    },
    {
      id: "2",
      avatar: "https://img.yzcdn.cn/vant/cat.jpeg",
      name: "李四",
      joinDate: Date.now(),
    },
    {
      id: "3",
      avatar: "https://img.yzcdn.cn/vant/cat.jpeg",
      name: "王五",
      joinDate: Date.now(),
    },
  ]);

  return (
    <View>
      <SearchBar />
      <MasterBar avatar='https://img.yzcdn.cn/vant/cat.jpeg' name='张三' />
      <MemberList memberList={memberList} />
    </View>
  );
}
