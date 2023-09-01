import { Cell, Field, Uploader, Input } from "@taroify/core";
import { View, Textarea } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useState } from "react";

export default function Index() {
  const [file, setFile] = useState<Uploader.File>();
  function onUpload() {
    Taro.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
    }).then(({ tempFiles }) => {
      setFile({
        url: tempFiles[0].path,
        type: tempFiles[0].type,
        name: tempFiles[0].originalFileObj?.name,
      });
    });
  }

  const [fullName, setFullName] = useState("");
  const [simpleName, setSimpleName] = useState("");
  const [label, setLabel] = useState("");
  const [location, setLocation] = useState("");
  const handleSelectLocation = ()=>{
    setLocation("gogogo")
  }

  const [poster, setPoster] = useState<Uploader.File[]>([]);
  function onUploadPoster() {
    Taro.chooseImage({
      count: 5,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
    }).then(({ tempFiles }) => {
      setPoster([
        ...poster,
        ...tempFiles.map(({ path, type, originalFileObj }) => ({
          type,
          url: path,
          name: originalFileObj?.name,
        })),
      ]);
    });
  }

  const handleBack = () => {
    Taro.navigateBack();
  };

  const handleNext = () => {
    if (!file) {
      Taro.showToast({
        title: "请上传圈子头像",
        icon: "none",
      });
      return;
    }

    if (!fullName) {
      Taro.showToast({
        title: "请输入圈子全称",
        icon: "none",
      });
      return;
    }

    if (!simpleName) {
      Taro.showToast({
        title: "请输入圈子简称",
        icon: "none",
      });
      return;
    }

    Taro.navigateTo({
      url: "/pages/circle-create/intro",
    });
  };

  return (
    <View className='min-h-screen bg-gray-1'>
      <View className='sticky top-0 z-10 flex items-center justify-between p-3 bg-white text-sm'>
        <View className='px-3 c-gray-5' onClick={handleBack}>
          取消
        </View>
        <View
          className='py-1 px-3 bg-gray-7 c-white rd-full'
          onClick={handleNext}
        >
          下一步
        </View>
      </View>

      <View className='flex flex-col items-center'>
        <View className='p-5'>
          <Uploader value={file} onUpload={onUpload} onChange={setFile} />
        </View>

        <Cell>
          <Field label='圈子全称'>
            <Input
              placeholder='请输入圈子全称'
              value={fullName}
              onChange={(e) => setFullName(e.detail.value)}
            />
          </Field>
        </Cell>

        <Cell>
          <Field label='圈子简称'>
            <Input
              placeholder='请输入圈子简称'
              value={simpleName}
              onChange={(e) => setSimpleName(e.detail.value)}
            />
          </Field>
        </Cell>

        <Cell>
          <Field label='标签定位'>
            <Input
              placeholder='请输入标签定位'
              value={label}
              onChange={(e) => setLabel(e.detail.value)}
            />
          </Field>
        </Cell>

        <Cell>
          <Field align='start' label='圈子介绍'>
            <Textarea
              className='w-full h-128'
              placeholder='请输入圈子介绍'
            />
          </Field>
        </Cell>

        <Cell>
          <Field label='所在地'>
            <View className='c-gray-5' onClick={handleSelectLocation}>{location || "点击选择所在地"}</View>
          </Field>
        </Cell>

        <Cell>
          <Field label='圈子封面'>
            <Uploader
              className='w-full'
              value={poster}
              onUpload={onUploadPoster}
              onChange={setPoster}
              multiple
            />
          </Field>
        </Cell>
      </View>
    </View>
  );
}
