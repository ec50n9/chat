import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { View, Text, ScrollView, Input, Image } from "@tarojs/components";
import {
  ScrollViewContext,
  showToast,
  showLoading,
  hideLoading,
  setClipboardData,
} from "@tarojs/taro";
import api, { OriginMessage } from "./api";
import "./index.scss";

type Message = {
  id: string;
  content: string;
  from: string;
  time: string;
};

const Origin2Message = (obj: OriginMessage): Message => {
  return {
    id: obj.message_id,
    content: obj.ask_question || obj.question_answer,
    from: obj.ask_question ? "me" : "other",
    time: obj.issue_time,
  };
};

function Chat() {
  // 头像映射
  const [avatarMapper, setAvatarMapper] = useState({
    me: require("../../assets/images/avatar.jpg"),
    other: require("../../assets/images/avatar.jpg"),
  });
  // 消息列表
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [previousSequenceId, setPreviousSequenceId] = useState("");

  // 获取消息列表
  const getMessages = async (sequenceId = "") => {
    try {
      showLoading({ title: "加载中" });
      setLoading(true);
      const res = await api.list(
        "c193d52dcc4faf3fb716be4e1db1ec19",
        sequenceId
      );
      if (res.code === 200) {
        setMessages((prevMessages) =>
          res.data.list.map(Origin2Message).reverse().concat(prevMessages)
        );
        setPreviousSequenceId(res.data.latest_sequence_id);
      }
    } catch (err) {
      console.error(err);
    } finally {
      hideLoading();
      setLoading(false);
    }
  };

  // 获取历史消息
  useEffect(() => {
    getMessages(previousSequenceId);
  }, []);

  const [prevScrollHeight, setPrevScrollHeight] = useState(0);
  const [loadMore, setLoadMore] = useState(false);
  const handleLoadMore = () => {
    if (loading) return;
    setLoadMore(true);
    setPrevScrollHeight(scrollRef.current?.scrollHeight || 0);

    getMessages(previousSequenceId).then(() => {
      setTimeout(() => {
        setLoadMore(false);
      }, 0);
    });
  };

  const [refreshing, setRefreshing] = useState(false);
  const handleRefresh = () => {
    if (refreshing) return;
    setRefreshing(true);
    setMessages([]);
    setPreviousSequenceId("");

    getMessages().then(() => {
      setTimeout(() => {
        setRefreshing(false);
      }, 0);
    });
  };

  // 输入框内容
  const [inputValue, setInputValue] = useState("");

  // 滚动到底部
  const scrollRef = useRef<ScrollViewContext>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [inited, setInited] = useState(false);
  const scrollToBottom = () => {
    // 如果是加载更多
    if (loadMore) {
      // let scrollDiff = scrollRef.current?.scrollHeight || 0;
      // scrollDiff -= prevScrollHeight;
      setScrollTop(0);
      return;
    }

    setScrollTop(99999);
    if (!inited && messages.length > 0) setInited(true);
  };
  useEffect(() => {
    setTimeout(scrollToBottom, 10);
  }, [messages]);

  // 输入框
  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  // 发送消息
  const handleSend = () => {
    if (inputValue.trim() === "") return;
    setMessages((prevMessages) =>
      prevMessages.concat([
        {
          id: messages.length + 1 + "",
          content: inputValue,
          from: "me",
          time: new Date().toISOString(),
        },
      ])
    );
    setInputValue("");
  };

  // 输入框聚焦
  const handleInputFocus = () => {
    setTimeout(scrollToBottom, 100);
  };

  // 复制
  const handleCopy = (message: Message) => {
    setClipboardData({
      data: message.content,
      success: () => {
        showToast({
          title: "复制成功",
          icon: "success",
          duration: 1000,
        });
      },
    });
  };

  return (
    <View className='chat'>
      {messages && messages.length > 0 ? (
        <ScrollView
          className='chat__content'
          scrollY
          scrollWithAnimation
          enableBackToTop
          onScrollToUpper={handleLoadMore}
          ref={scrollRef}
          scrollTop={scrollTop}
        >
          <View className='chat__content__list'>
            {messages.map((message) => (
              <View
                key={message.id}
                className={`message message--${message.from}`}
              >
                <Image
                  className='message__avatar'
                  src={avatarMapper[message.from]}
                />
                <View className='message__content'>
                  <View className='message__text'>
                    <Text>
                      {message.content.split("\n").map((line, index) => (
                        <Text key={index}>
                          {index !== 0 && <br />}
                          {line}
                        </Text>
                      ))}
                    </Text>
                  </View>
                  <View className='message__meta'>
                    {/* <Time className="message__time" timestamp={message.time} /> */}
                    <View className='message__time'>{message.time}</View>
                    {message.from === "other" ? (
                      <View
                        className='message__copy'
                        onClick={() => handleCopy(message)}
                      >
                        复制
                      </View>
                    ) : (
                      ""
                    )}
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      ) : (
        <View className='chat__content chat__content--empty'>无聊天记录</View>
      )}
      <View className='chat__input'>
        <Input
          value={inputValue}
          onInput={handleInput}
          onConfirm={handleSend}
          onClick={handleInputFocus}
          placeholder='请输入消息'
          confirmType='send'
        />
        <View className='chat__send' onClick={handleSend}>
          发送
        </View>
      </View>

      {/* 悬浮按钮 */}
      <View className='floating-btn' onClick={handleRefresh}>
        re
      </View>
    </View>
  );
}

export default Chat;
