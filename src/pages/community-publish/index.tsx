import {
  BaseEventOrig,
  FormProps,
  Textarea,
  View,
  Text,
} from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useState } from "react";
import { AppsOutlined, Arrow, Close, Ellipsis } from "@taroify/icons";
import { Cell, Switch, Uploader } from "@taroify/core";
import "@taroify/icons/index.scss";
import "./index.scss";

function BasicUploader(props: {
  value: Uploader.File[];
  onChange: (value: Uploader.File[]) => void;
}) {
  function onUpload() {
    Taro.chooseImage({
      count: 9 - props.value.length,
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
  const handleFilesChange = (_files: Uploader.File[]) => {
    setFiles(_files);
    console.log(_files);
  };

  const handleSubmit = (
    event: BaseEventOrig<FormProps.onSubmitEventDetail>
  ) => {
    console.log(content);
    console.log(files);
  };

  const [tags, setTags] = useState<string[]>(["前端", "后端"]);
  const [isTop, setIsTop] = useState<boolean>(false);

  const handleSelectTags = () => {
    Taro.navigateTo({
      url: "/pages/tags-select/index",
      events: {
        updateSelectedTags: ({ selectedTags }: { selectedTags: string[] }) => {
          console.log("tag update", selectedTags);
        },
      },
      success: (res) => {
        res.eventChannel.emit("initSelectedTags", { selectedTags: tags });
      },
    });
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
          <BasicUploader value={files} onChange={handleFilesChange} />
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

      {/* 添加标签 */}
      <Cell
        title='添加标签'
        brief={
          <View className='mt-1 flex flex-wrap gap-2'>
            {tags.map((tag, i) => (
              <Text
                key={i}
                className='px-3 py-1 text-xs bg-gray-2 c-gray-7 rd-2'
              >
                # {tag}
              </Text>
            ))}
          </View>
        }
        rightIcon={
          <Arrow size='20' color='#9ca3af' style={{ marginTop: "2px" }} />
        }
        clickable
        onClick={handleSelectTags}
      >
        已选 {tags.length} 个
      </Cell>

      {/* 置顶 */}
      <Cell
        align='center'
        title='置顶'
        rightIcon={<Switch size='24' checked={isTop} onChange={setIsTop} />}
      />
    </View>
  );
}

export default Index;
