import { BaseEventOrig, FormProps, Textarea, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useState } from "react";
import { Arrow } from "@taroify/icons";
import { Uploader } from "@taroify/core";
import "@taroify/icons/index.scss";
import "./index.scss";

function BasicUploader(props: {
  value: Uploader.File[];
  onChange: (value: Uploader.File[]) => void;
}) {
  function onUpload() {
    Taro.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
    }).then(({ tempFiles }) => {
      props.onChange([
        ...props.value,
        ...tempFiles.map((item) => ({
          url: item.path,
          type: item.type,
          name: item.originalFileObj?.name,
        })),
      ]);
    });
  }

  return (
    <Uploader
      value={props.value}
      multiple
      maxFiles={9}
      onUpload={onUpload}
      onChange={props.onChange}
    />
  );
}

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
  const [files, setFiles] = useState<Uploader.File[]>([]);

  const handleSubmit = (
    event: BaseEventOrig<FormProps.onSubmitEventDetail>
  ) => {
    console.log(content);
    console.log(files);
  };

  return (
    <View className='community-publish-page'>
      <View className='header'>
        <View className='header__title'></View>
        <View
          className={`header__publish ${
            content.length && "header__publish--active"
          }`}
          onClick={handleSubmit}
        >
          发布
        </View>
      </View>
      {/* 文本 */}
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
        {/* 图片 */}
        <View className='pics'>
          <BasicUploader value={files} onChange={setFiles} />
        </View>
      </View>
      {/* 圈子 */}
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
