import { Button, Uploader } from "@taroify/core";
import { NewspaperOutlined, Plus } from "@taroify/icons";
import { Textarea, View } from "@tarojs/components";
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

  const handleBack = () => {
    Taro.navigateBack();
  };
  const handleDone = () => {
    Taro.navigateTo({
      url: "/pages/circle-create/intro",
    });
  };

  return (
    <View className='min-h-screen bg-gray-1'>
      <View className='flex items-center justify-between p-3 bg-white text-sm'>
        <View className='px-3 c-gray-5' onClick={handleBack}>
          返回
        </View>
        <View
          className='py-1 px-3 bg-gray-7 c-white rd-full'
          onClick={handleDone}
        >
          完成
        </View>
      </View>

      <View className='m-5 bg-white rd-3 b-1 b-solid b-gray-3 of-hidden'>
        <View className='py-3 text-center b-b-1 b-b-solid b-b-gray-1'>
          圈子介绍
        </View>
        <View className='py-3 px-5'>
          <Textarea
            className='w-full'
            autoHeight
            placeholder='请输入圈子介绍'
          />
        </View>
      </View>

      <View className='flex justify-center mt-5 mx-5'>
        <Uploader
          className='w-full'
          value={file}
          onUpload={onUpload}
          onChange={setFile}
        >
          <View className='w-full py-2 bg-white rd-3 b-1 b-solid b-gray-3 text-center text-sm'>
            设置圈子介绍海报 <NewspaperOutlined size={24} />
          </View>
        </Uploader>
      </View>
    </View>
  );
}
