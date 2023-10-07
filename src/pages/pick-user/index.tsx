import { Search } from "@taroify/core";
import { Image, View } from "@tarojs/components";
import { useEffect, useState } from "react";
import classNames from "classnames";

function BasicSearch(props: {
  className?: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const { className, value, onChange } = props;

  return (
    <Search
      className={classNames(className)}
      value={value}
      placeholder='请输入搜索关键词'
      onChange={(e) => onChange(e.detail.value)}
    />
  );
}

type User = {
  id: string;
  nickname: string;
  avatar: string;
  desc: string;
};

function UserItem(props: {
  user: User;
  picked: boolean;
  onPick: (id: User["id"]) => void;
}) {
  const { user, picked, onPick } = props;

  return (
    <View className='p-3 flex items-center gap-3 bg-white b-b b-b-solid b-b-gray-3'>
      <Image
        className='shrink-0 w-96 h-96 rd-2 of-hidden'
        src={user.avatar}
        mode='aspectFill'
      />

      <View className='grow w-0'>
        <View className='truncate'>{user.nickname}</View>
        <View className='text-sm c-gray-4'>{user.desc}</View>
      </View>

      <View className='shrink-0'>
        <View
          className={classNames("px-3 py-1 text-sm rd-2", {
            "bg-gray-3 c-gray-7": picked,
            "bg-gray-7 c-white": !picked,
          })}
          onClick={() => onPick(user.id)}
        >
          {picked ? "取消" : ""}选择
        </View>
      </View>
    </View>
  );
}

function UserList(props: {
  users: User[];
  pickedSet: Set<string>;
  onPick: (id: User["id"]) => void;
  className?: string;
}) {
  const { users, pickedSet, onPick, className } = props;

  return (
    <View className={classNames(className)}>
      {users.map((user) => (
        <UserItem
          key={user.id}
          user={user}
          picked={pickedSet.has(user.id)}
          onPick={onPick}
        />
      ))}
    </View>
  );
}

function SubmitBar(props: {
  className?: string;
  disabled: boolean;
  onSubmit: () => void;
}) {
  const { className, disabled, onSubmit } = props;

  return (
    <View
      className={classNames(
        "px-3 py-2 bg-white b-t b-t-solid b-t-gray-3",
        className
      )}
    >
      <View
        className={classNames("py-3 text-center text-sm rd-2", {
          "bg-gray-2 c-gray-5": disabled,
          "bg-gray-7 c-white": !disabled,
        })}
        onClick={() => !disabled && onSubmit()}
      >
        完成选择
      </View>
    </View>
  );
}

export default function Index() {
  const [searchValue, setSearchValue] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [pickedSet, setPickedSet] = useState(new Set<string>());

  useEffect(() => {
    setUsers(
      Array.from({ length: 20 }).map((_, index) => ({
        id: `${index}`,
        nickname: `张三${index}`,
        avatar: "https://img.yzcdn.cn/vant/cat.jpeg",
        desc: "张三的个人简介",
      }))
    );
  }, []);

  const handleSearchValueChange = (value: string) => {
    setSearchValue(value);
    // 做一些搜索操作
  };

  const handlePick = (id: User["id"]) => {
    if (pickedSet.has(id)) pickedSet.delete(id);
    else pickedSet.add(id);
    setPickedSet(new Set(pickedSet));
  };

  const handleSubmit = () => {
    const pickedIds = [...pickedSet];
    console.log("submit", pickedIds);
  };

  return (
    <View className='min-h-screen flex flex-col bg-gray-1'>
      <BasicSearch
        className='shrink-0'
        value={searchValue}
        onChange={handleSearchValueChange}
      />
      <UserList
        className='grow h-0 of-auto'
        users={users}
        pickedSet={pickedSet}
        onPick={handlePick}
      />
      <SubmitBar
        className='shrink-0'
        disabled={!pickedSet.size}
        onSubmit={handleSubmit}
      />
    </View>
  );
}
