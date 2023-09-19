import { Input } from "@taroify/core";
import {
  BaseEventOrigFunction,
  Image,
  ScrollView,
  ScrollViewProps,
  Text,
  View,
} from "@tarojs/components";
import { useEffect, useState } from "react";
import classnames from "classnames";
import dayjs from "dayjs";
import Taro from "@tarojs/taro";

type User = {
  id: string;
  avatar: string;
  nickname: string;
};

type Message = {
  id: string;
  content: string;
  sender: User;
  receiver: User;
  time: number;
};

function MessageItem(props: { message: Message; right?: boolean }) {
  const { message } = props;

  const handleCopy = () => {
    Taro.setClipboardData({
      data: message.content,
      success: () => Taro.showToast({ title: "复制成功" }),
    });
  };

  return (
    <View
      className={classnames(
        "px-3 flex gap-2",
        props.right && "flex-row-reverse"
      )}
    >
      <Image
        className='shrink-0 w-72 h-72 bg-gray-3 rounded-full'
        src='https://img01.yzcdn.cn/vant/cat.jpeg'
        mode='aspectFill'
      />
      <View
        className={classnames(
          "grow w-0 flex flex-col",
          props.right ? "items-end pl-12" : "items-start pr-12"
        )}
      >
        <View className='inline-block px-3 py-2 text-sm c-gray-5 break-all bg-white rd-3'>
          {message.content}
        </View>
        <View className='mt-1 flex gap-2 text-xs c-gray-3'>
          <Text>{dayjs(message.time).format("YYYY-MM-DD HH:mm")}</Text>
          <Text onClick={handleCopy}>复制</Text>
        </View>
      </View>
    </View>
  );
}

export default function Index() {
  // 列表相关
  const [scrollTop, setScrollTop] = useState(0);
  const Threshold = 20;
  const handleScrollToUpper = () => {};
  const handleScroll: BaseEventOrigFunction<ScrollViewProps.onScrollDetail> = (
    e
  ) => {};

  // 输入框内容
  const [value, setValue] = useState("");
  // 消息列表
  const [messages, setMessages] = useState([] as Message[]);

  const sender = {
    id: "1",
    avatar: "",
    nickname: "张三",
  };
  const receiver = {
    id: "2",
    avatar: "",
    nickname: "李四",
  };

  // 初始化消息
  const initMessages = () => {
    setMessages(
      new Array(20).fill(0).map((_, i) => ({
        id: i.toString(),
        content: `message ${i}e`,
        sender: i % 2 === 0 ? sender : receiver,
        receiver: i % 2 === 0 ? receiver : sender,
        time: Date.now(),
      }))
    );
  };

  // 初始化数据
  useEffect(() => {
    initMessages();
    setScrollTop(100000);
  }, []);

  // 刷新按钮事件
  const handleRefresh = () => {
    initMessages();
  };

  // 发送按钮事件
  const handleSend = () => {
    if (!value) return;
    setMessages([
      ...messages,
      {
        id: messages.length.toString(),
        content: value,
        sender,
        receiver,
        time: Date.now(),
      },
    ]);
    setValue("");
  };

  return (
    <View className='relative min-h-screen flex flex-col bg-gray-1'>
      {/* 消息列表 */}
      <ScrollView
        className='grow h-0 py-3'
        scrollY
        scrollWithAnimation
        scrollTop={scrollTop}
        lowerThreshold={Threshold}
        upperThreshold={Threshold}
        onScrollToUpper={handleScrollToUpper}
        onScroll={handleScroll}
      >
        <View className='flex flex-col gap-3'>
          {messages.map((message) => (
            <MessageItem
              key={message.id}
              message={message}
              right={message.sender.id === sender.id}
            />
          ))}
        </View>
      </ScrollView>
      {/* 输入框 */}
      <View className='shrink-0'>
        <View className='py-2 px-3 flex justify-center items-center gap-3 bg-white'>
          <Input
            className='grow w-0'
            placeholder='请输入消息'
            value={value}
            onChange={(e) => setValue(e.detail.value)}
          />
          <View
            className='shrink-0 px-4 py-2 text-sm c-white bg-blue-4 rd-2 active:bg-blue-5'
            onClick={handleSend}
          >
            发送
          </View>
        </View>
      </View>
      {/* 刷新按钮 */}
      <View
        className='absolute top-40 right-24 w-80 h-80 flex items-center justify-center bg-blue-4 c-white text-xs rd-full'
        onClick={handleRefresh}
      >
        刷新
      </View>
    </View>
  );
}
