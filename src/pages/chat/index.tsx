import { useState, useRef, useEffect, Component } from "react";
import { View, Text, ScrollView, Input, Image, Icon } from "@tarojs/components";
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
  const getMessages = async () => {
    try {
      showLoading({ title: "加载中" });
      setLoading(true);
      const res = await api.list(
        "c193d52dcc4faf3fb716be4e1db1ec19",
        previousSequenceId
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
    getMessages();
  }, []);

  const [prevScrollHeight, setPrevScrollHeight] = useState(0);
  const [loadMore, setLoadMore] = useState(false);
  const handleLoadMore = () => {
    if (loading) return;
    setLoadMore(true);
    setPrevScrollHeight(scrollRef.current?.scrollHeight || 0);

    getMessages().then(() => {
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
  const [inited, setInited] = useState(false);
  const scrollToBottom = () => {
    // 如果是加载更多
    if (loadMore || refreshing) {
      let scrollDiff = scrollRef.current?.scrollHeight;
      if (loadMore) {
        scrollDiff -= prevScrollHeight;
      }

      scrollRef.current?.scrollTo({
        top: scrollDiff,
        behavior: "auto",
      });
      return;
    }

    const behavior = inited ? "smooth" : "auto";
    scrollRef.current?.scrollTo({
      top: scrollRef.current?.scrollHeight - scrollRef.current?.clientHeight,
      behavior,
    });
    if (!inited && messages.length > 0) setInited(true);
  };
  useEffect(scrollToBottom, [messages]);

  const handleScrollToLower = (e) => {
    const scrollTop = scrollRef.current?.scrollTop || 0;
    const scrollHeight = scrollRef.current?.scrollHeight || 0;

    const clientHeight = scrollRef.current?.clientHeight || 0;
    const loadMoreHeight = loadMoreRef.current?.clientHeight || 0;
    const maxScrollTop = scrollHeight - clientHeight - loadMoreHeight;
    if (scrollTop >= maxScrollTop) {
      scrollRef.current?.scrollTo({
        top: maxScrollTop,
        behavior: "smooth",
      });
      handleRefresh();
    }
  };

  // 底部上拉刷新
  const loadMoreRef = useRef<Component>(null);

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
    <View className="chat">
      {messages && messages.length > 0 ? (
        <ScrollView
          className="chat__content"
          scrollY
          scrollWithAnimation
          enableBackToTop
          onScrollToUpper={handleLoadMore}
          ref={scrollRef}
        >
          {messages.map((message) => (
            <View
              key={message.id}
              className={`message message--${message.from}`}
            >
              <Image
                className="message__avatar"
                src={avatarMapper[message.from]}
              />
              <View className="message__content">
                <View className="message__text">
                  <Text>
                    {message.content.split("\n").map((line, index) => (
                      <Text key={index}>
                        {index !== 0 && <br />}
                        {line}
                      </Text>
                    ))}
                  </Text>
                </View>
                <View className="message__meta">
                  {/* <Time className="message__time" timestamp={message.time} /> */}
                  <View className="message__time">{message.time}</View>
                  {message.from === "other" ? (
                    <View
                      className="message__copy"
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
        </ScrollView>
      ) : (
        <View className="chat__content chat__content--empty">无聊天记录</View>
      )}
      <View className="chat__input">
        <Input
          value={inputValue}
          onInput={handleInput}
          onConfirm={handleSend}
          onClick={handleInputFocus}
          placeholder="请输入消息"
          confirmType="send"
        />
        <View className="chat__send" onClick={handleSend}>
          发送
        </View>
      </View>

      {/* 悬浮按钮 */}
      <View className="floating-btn" onClick={handleRefresh}>
        re
      </View>
    </View>
  );
}

export default Chat;
