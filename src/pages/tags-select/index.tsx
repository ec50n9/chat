import { Input, Search } from "@taroify/core";
import { Cross } from "@taroify/icons";
import { View, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useCallback, useEffect, useRef, useState } from "react";

// 节流
const throttle = (fn: Function, delay: number) => {
  let lastTime = 0;
  return (...args: any) => {
    const now = Date.now();
    if (now - lastTime > delay) {
      lastTime = now;
      fn(...args);
    }
  };
};

// 防抖
const debounce = (fn: Function, delay: number) => {
  let timer: any = null;
  return (...args: any) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

const handleSearch = throttle((value: string) => console.log(value), 300);

export default function Index() {
  const [selectedTagsSet, setSelectedTagsSet] = useState<Set<string>>(
    new Set([])
  );

  // 和父页面同步tags，这个部分在h5无效，所以我注释了，根据文档，在小程序是有效的，自行测试
  // useEffect(() => {
  //   const pages = Taro.getCurrentPages();
  //   const current = pages[pages.length - 1];
  //   const eventChannel = current.getOpenerEventChannel();
  //   eventChannel.emit("updateSelectedTags", {
  //     selectedTags: [...selectedTagsSet],
  //   });

  //   eventChannel.on("initSelectedTags", ({ selectedTags }) =>
  //     setSelectedTagsSet(new Set([...selectedTags]))
  //   );
  // }, []);

  const [input, setInput] = useState<string>("");
  const [searchTags, setSearchTags] = useState<string[]>([]);
  const debounceSearch = useCallback(
    debounce((value: string) => {
      if (!value) return setSearchTags([]);
      console.log(value);
      // 这里应该调用接口进行搜索，并将返回的结果填充到searchTags
      setSearchTags([value, "搜索标签2"]);
    }, 300),
    []
  );
  useEffect(() => debounceSearch(input), [input]);

  const [commonTags, setCommonTags] = useState(["原创", "文学", "同人文"]);
  const [hotTags, setHotTags] = useState([
    "标签1",
    "标签2",
    "标签3",
    "标签4",
    "标签5",
  ]);

  const addTag = (tag: string) => {
    selectedTagsSet.add(tag);
    setSelectedTagsSet(new Set([...selectedTagsSet]));
  };

  const removeTag = (tag: string) => {
    selectedTagsSet.delete(tag);
    setSelectedTagsSet(new Set([...selectedTagsSet]));
  };

  return (
    <View>
      {/* 已选择标签 */}
      <View className='px-5 pt-4 pb-1 bg-white flex items-center gap-2 flex-wrap'>
        <View className='c-gray-7'>已选择:</View>
        {[...selectedTagsSet].map((tag, index) => (
          <View
            key={index}
            className='px-3 py-1 flex items-center gap-2 c-gray-7 text-sm bg-gray-1 rd-full'
          >
            <Text># {tag}</Text>
            <View className='h-30 w-2 bg-gray-4'></View>
            <Cross onClick={() => removeTag(tag)} />
          </View>
        ))}
      </View>

      <View className='w-full'>
        {/* 标签输入框 */}
        <Search
          className='w-full'
          placeholder='搜索或添加标签'
          value={input}
          onChange={(e) => setInput(e.detail.value)}
        />
        {/* 搜索结果 */}
        {searchTags.length ? (
          <View className='px-5 bg-white flex gap-2 flex-wrap'>
            {searchTags.map((tag, index) => (
              <View
                key={index}
                className='px-3 py-1 c-gray-7 text-sm bg-gray-1 rd-full'
                onClick={() => addTag(tag)}
              >
                # {tag}
              </View>
            ))}
          </View>
        ) : null}
      </View>

      <View className='mt-3 px-5'>
        {/* 常用标签 */}
        <View className='c-gray-4 text-sm'>常用标签</View>
        <View className='mt-2 flex gap-2 flex-wrap'>
          {commonTags.map((tag, index) => (
            <View
              key={index}
              className='px-3 py-1 c-teal-6 text-sm bg-teal-1 rd-full'
              onClick={() => addTag(tag)}
            >
              # {tag}
            </View>
          ))}
        </View>

        {/* 热门标签 */}
        <View className='mt-3 c-gray-4 text-sm'>热门标签</View>
        <View className='mt-2 flex gap-2 flex-wrap'>
          {hotTags.map((tag, index) => (
            <View
              key={index}
              className='px-3 py-1 c-pink-7 text-sm bg-pink-1 rd-full'
              onClick={() => addTag(tag)}
            >
              # {tag}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
