import { BaseEventOrig, FormProps, Textarea, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useState } from "react";
import { Arrow } from "@taroify/icons";
import "@taroify/icons/index.scss";
import "./index.scss";

function Index() {
  const { mode } = Taro.getCurrentInstance().router?.params || ({} as any);

  const titleMap = {
    text: "文字",
    "img-text": "图文",
    img: "图片",
  };

  Taro.setNavigationBarTitle({
    title: `发布${titleMap[mode]}`,
  });

  const [content, setContent] = useState("");

  const handleSubmit = (
    event: BaseEventOrig<FormProps.onSubmitEventDetail>
  ) => {};

  return (
    <View className='community-publish-page'>
      <View className='header'>
        <View className='header__title'></View>
        <View
          className={`header__publish ${
            content.length && "header__publish--active"
          }`}
        >
          发布
        </View>
      </View>
      <View className='form'>
        <Textarea
          className='input-content'
          placeholder='来聊聊你的见解'
          value={content}
          onInput={(e) => setContent(e.detail.value)}
          autoFocus
          maxlength={1000}
          confirmType='done'
        />
      </View>
      <View className='circles'>
        <View className='circles__header'>
          <View className='circles__header__title'>选择圈子</View>
          <View className='circles__header__count'>已选择 2 个</View>
          <View className='circles__header__arrow'>
            <Arrow />
          </View>
        </View>
        <View className='circles-list'>
          <View className='circles-item'>
            <View className='circles-item__name'># 前端</View>
          </View>
          <View className='circles-item'>
            <View className='circles-item__name'># 后端</View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default Index;
